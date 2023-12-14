const { DEVELOPER, EMPRESA, SUCURSAL } = require("../database/db");
const { Op, Sequelize } = require("sequelize");
const JWT_DEVELOPERS = process.env.JWT_DEVELOPERS;
const jwt = require("jsonwebtoken");

const singUpDeveloper = async ({ email, password }) => {
  const create = await DEVELOPER.findOne({
    where: { email: email },
  });

  if (create) return "este usuario ya existe";

  await DEVELOPER.create({
    email: email,
    password: password,
  });
  return "usuario creado con exito!";
};

const singInDeveloper = async ({ email, password }) => {
  const found = await DEVELOPER.findOne({
    where: {
      [Op.and]: [{ email: email }, { password: password }],
    },
  });

  if (found) {
    const token = jwt.sign(
      {
        role: "developer",
        exp: Date.now() / 1000 + 60 * 1440,
      },
      JWT_DEVELOPERS
    );
    return token;
  }
};

const getTotalBranchsController = async () => {
  const cantidad = await EMPRESA.count({
    attributes: [
      "id_empresa",
      "nombre_empresa",
      [
        Sequelize.fn("ARRAY_AGG", Sequelize.literal(`nombre_sucursal`)),
        "sucursales",
      ],
    ],
    include: [
      {
        model: SUCURSAL,
        attributes: [],
      },
    ],
    group: ["id_empresa", "nombre_empresa"],
  });

  return cantidad;
};

const deleteEmpresaController = async ({ branch }) => {
  const deleted = await EMPRESA.destroy({
    where: {
      id_empresa: branch,
    },
  });

  return deleted;
};

const restoreEmpresaController = async ({ branch }) => {
  const restored = await EMPRESA.restore({
    where: {
      id_empresa: branch,
    },
  });

  return restored;
};

const getDisabledEmpresasController = async () => {
  const disabled = await EMPRESA.count({
    attributes: [
      "id_empresa",
      "nombre_empresa",
      [
        Sequelize.fn("ARRAY_AGG", Sequelize.literal(`nombre_sucursal`)),
        "sucursales",
      ],
    ],
    where: {
      deletedAt: {
        [Op.not]: null,
      },
    },
    include: [
      {
        model: SUCURSAL,
        attributes: [],
      },
    ],
    group: ["id_empresa", "nombre_empresa"],
    paranoid: false,
  });

  return disabled;
};

module.exports = {
  singUpDeveloper,
  singInDeveloper,
  getTotalBranchsController,
  deleteEmpresaController,
  restoreEmpresaController,
  getDisabledEmpresasController,
};
