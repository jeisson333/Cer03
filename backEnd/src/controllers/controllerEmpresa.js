const { EMPRESA } = require("../database/db");
const { Op } = require("sequelize");

const postEmpresa = async ({ nombre_empresa, email, password }) => {
  const create = await EMPRESA.findOne({
    where: {
      [Op.or]: [{ nombre_empresa: nombre_empresa }, { email: email }],
    },
  });

  if (create) return "Ya existe la empresa con ese nombre o email";

  await EMPRESA.create({
    nombre_empresa: nombre_empresa,
    email: email,
    password: password,
    fecha_licencia: Date.now(),
  });

  return "Se ha creado la empresa";
};

const getEmpresa = () => {};

module.exports = {
  getEmpresa,
  postEmpresa,
};
