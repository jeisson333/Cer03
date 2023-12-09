const { PRODUCTO, CATALOGO_UNIVERSAL, EMPRESA } = require("../database/db");
const { Op } = require("sequelize");

const obtainAllProducts = async ({ conditions, idBranch }) => {
  if (!idBranch?.id) throw new Error("The query need Product's branch");
  let products = await PRODUCTO.findAll({
    attributes: [
      "id_producto",
      "nombre_producto",
      "image",
      "peso",
      "valor_venta",
      "valor_compra",
    ],
    where: {
      producto_empresa: idBranch?.id, //all products --> branch
      nombre_producto: {
        [Op.iLike]: conditions?.name ? `%${conditions.name}%` : "%%",
      },
    },
    include: [
      {
        model: CATALOGO_UNIVERSAL,
        attributes: ["id_catalogo", "nombre_catalogo"],
      },
      {
        model: EMPRESA,
        attributes: ["nombre_empresa"],
      },
    ],
  });
  return products;
};

module.exports = {
  obtainAllProducts,
};
