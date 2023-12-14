const { EMPRESA, CATALOGO_UNIVERSAL, SUCURSAL } = require("../database/db");
const { Op } = require("sequelize");
const JWT_PAY_SUBCRIPTION = process.env.JWT_PAY_SUBCRIPTION;
const jwt = require("jsonwebtoken");

const postEmpresa = async ({ nombre_empresa, email, password }) => {
  const create = await EMPRESA.findOne({
    where: {
      [Op.or]: [{ nombre_empresa: nombre_empresa }, { email: email }],
    },
  });

  if (create) return "Ya existe la empresa con ese nombre o email";

  const freeTier = await CATALOGO_UNIVERSAL.findOne({
    where: {
      nombre_catalogo: "free",
    },
  });

  await EMPRESA.create({
    nombre_empresa: nombre_empresa,
    email: email,
    password: password,
    fecha_licencia: Date.now(),
    tipo_subcripcion: freeTier?.id_catalogo,
  });

  return "Se ha creado la empresa";
};

const updateEmpresa = async ({ values }) => {
  try {
    const { name_subcripcion, idBranch } = values;

    const tipo_subcripcion = await CATALOGO_UNIVERSAL.findOne({
      where: {
        nombre_catalogo: name_subcripcion,
      },
    });

    const resultPromise = EMPRESA.update(
      { tipo_subcripcion: tipo_subcripcion?.id_catalogo },
      {
        where: {
          id_empresa: idBranch,
        },
      }
    );

    const sucursalPromise = SUCURSAL.findAll({
      where: {
        sucursal_empresa: idBranch,
      },
    });

    const empresaPromise = EMPRESA.findOne({
      where: {
        id_empresa: idBranch,
      },
    });

    const [result, sucursal, empresa] = await Promise.all([
      resultPromise,
      sucursalPromise,
      empresaPromise,
    ]);

    if (result[0] === 0) {
      throw new Error(`La empresa con el '${idBranch}' no existe`);
    }

    const token = jwt.sign(
      {
        idBranch: idBranch,
        idUser: null,
        role: "admin",
        email: empresa?.email,
        branch: sucursal[0]?.nombre_sucursal,
        exp: Date.now() / 1000 + 60 * 1440,
        subscription: name_subcripcion,
      },
      JWT_PAY_SUBCRIPTION
    );
    return token;
  } catch (error) {
    throw error;
  }
};

const getEmpresa = () => {};

module.exports = {
  getEmpresa,
  postEmpresa,
  updateEmpresa,
};
