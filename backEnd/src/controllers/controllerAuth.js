const {
  EMPRESA,
  VENDEDOR,
  SUCURSAL,
  CATALOGO_UNIVERSAL,
} = require("../database/db");
const jwt = require("jsonwebtoken");
const JWT_SIGN_IN = process.env.JWT_SIGN_IN;
const singIn = async (email, password) => {
  let date;
  let role;
  let idBranch;
  let sucursal = "";
  let idUser;
  let tipo_subcripcion;
  let user;
  const empresaPromise = EMPRESA.findOne({
    where: {
      email: email,
    },
  });
  const vendedorPromise = VENDEDOR.findOne({
    where: {
      usuario_vendedor: email,
    },
  });

  const [empresa, vendedor] = await Promise.all([
    empresaPromise,
    vendedorPromise,
  ]);

  if (!empresa && !vendedor) throw new Error("Not exist user");
  else if (empresa) {
    if (empresa?.password != password) throw new Error("Password incorrect");
    else {
      idBranch = empresa?.id_empresa;
      date = empresa?.fecha_licencia;
      role = "admin";
      const modelSucursalPromise = SUCURSAL.findAll({
        where: {
          sucursal_empresa: empresa?.id_empresa,
        },
      });
      const modelSubcripcionPromise = CATALOGO_UNIVERSAL.findOne({
        where: {
          id_catalogo: empresa?.tipo_subcripcion,
        },
      });

      const [modelSucursal, modelSubcripcion] = await Promise.all([
        modelSucursalPromise,
        modelSubcripcionPromise,
      ]);
      tipo_subcripcion = modelSubcripcion?.nombre_catalogo;
      sucursal = modelSucursal[0]?.nombre_sucursal;
      user = empresa?.email;
    }
  } else {
    if (vendedor?.contraseña_vendedor != password)
      throw new Error("Password incorrect");
    else {
      modelSucursal = await SUCURSAL.findOne({
        where: {
          id_sucursal: vendedor?.vendedor_sucursal,
        },
      });
      modelEmpresa = await EMPRESA.findOne({
        where: {
          id_empresa: modelSucursal?.sucursal_empresa,
        },
      });
      const modelSubcripcion = await CATALOGO_UNIVERSAL.findOne({
        where: {
          id_catalogo: modelEmpresa?.tipo_subcripcion,
        },
      });

      if (!modelSucursal) throw new Error("Sucursal not exist");
      idBranch = modelSucursal?.sucursal_empresa;
      idUser = vendedor?.id_vendedor;
      role = "user";
      sucursal = modelSucursal?.nombre_sucursal;
      date = modelEmpresa?.fecha_licencia;
      tipo_subcripcion = modelSubcripcion?.nombre_catalogo;
    }
  }
  const dayMS = 1000 * 60 * 60 * 24;
  const restDaysMS = Math.abs(Date.now() - date);
  const countDays = restDaysMS / dayMS;
  if (countDays > 30) throw new Error("Expired license");

  const token = jwt.sign(
    {
      idBranch: idBranch,
      idUser: idUser ? idUser : null,
      role: role,
      email: user ? user : null,
      branch: sucursal,
      exp: Date.now() / 1000 + 60 * 1440,
      subscription: tipo_subcripcion,
    },
    JWT_SIGN_IN
  );
  return token;
};

module.exports = {
  singIn,
};
