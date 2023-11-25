const { SUCURSAL, EMPRESA } = require("../database/db");
const { Op } = require("sequelize");
const { handlerFilters, handlerApiFormat } = require("./controllerPages");

const controllerAllSucursales = async (conditions, idBranch) => {
  if (!idBranch?.id) throw new Error("Not id branch");

  const [pageNumber, limit, offset] = handlerFilters({ conditions });

  const countPromise = SUCURSAL.findAll({
    where: {
      sucursal_empresa: idBranch?.id,
    },
  });

  const sucursalesPromise = SUCURSAL.findAll({
    attributes: ["id_sucursal", "nombre_sucursal"],
    where: {
      sucursal_empresa: idBranch?.id,
      nombre_sucursal: {
        [Op.iLike]: conditions?.name ? `%${conditions?.name}%` : "%%",
      },
    },
    limit: limit,
    offset: offset,
  });

  const [count, sucursales] = await Promise.all([
    countPromise,
    sucursalesPromise,
  ]);

  if (!sucursales.length) throw new Error("Not found sucursales");

  return handlerApiFormat(sucursales, pageNumber, count.length, limit);
};

module.exports = {
  controllerAllSucursales,
};
