const { EMPRESA, VENDEDOR, SUCURSAL } = require("../database/db");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const singIn = async (email, password) => {
  let date;
  let role;
  let idBranch;
  let sucursal = "";
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
      if (!modelSucursal) throw new Error("Sucursal not exist");
      idBranch = modelSucursal?.sucursal_empresa;
      role = "user";
      sucursal = modelSucursal?.nombre_sucursal;
      date = modelEmpresa?.fecha_licencia;
    }
  }
  const dayMS = 1000 * 60 * 60 * 24;
  const restDaysMS = Math.abs(Date.now() - date);
  const countDays = restDaysMS / dayMS;
  if (countDays > 30) throw new Error("Expired license");

  const token = jwt.sign(
    {
      idBranch: idBranch,
      role: role,
      branch: sucursal,
      exp: Date.now() / 1000 + 60 * 1440,
    },
    SECRET
  );
  return token;
};

module.exports = {
  singIn,
};
/*var token = jwt.sign({ foo: 'bar' }, 'shhhhh');*/
