const {
  PRODUCTO,
  CATALOGO_UNIVERSAL,
  INVENTARIO_PRODUCTO,
  SUCURSAL,
} = require("../database/db");
const { Op } = require("sequelize");
const {
  handleFiltersProducts,
  handlerFormatProducts,
} = require("./controllerPages");

const obtainAllProducts = async ({ conditions, idBranch }) => {
  if (!idBranch?.id) throw new Error("The query need Product's branch");
  const [pageNumber, limit, offset] = handleFiltersProducts({
    conditions,
  });
  const countPromise = INVENTARIO_PRODUCTO.count({
    include: [
      {
        model: PRODUCTO,
        where: {
          producto_empresa: idBranch?.id,
          nombre_producto: {
            [Op.iLike]: conditions?.name ? `%${conditions?.name}%` : "%%",
          },
        },
        include: [
          {
            model: CATALOGO_UNIVERSAL,
            where: {
              nombre_catalogo: {
                [Op.iLike]: conditions?.type ? `%${conditions?.type}%` : "%%",
              },
            },
          },
        ],
      },
      {
        model: SUCURSAL,
        where: {
          nombre_sucursal: {
            [Op.iLike]: conditions?.sucursal
              ? `%${conditions?.sucursal}%`
              : "%%",
          },
        },
      },
    ],
  });
  const productsPromise = INVENTARIO_PRODUCTO.findAll({
    attributes: ["stock"],
    include: [
      {
        model: PRODUCTO,
        attributes: [
          "id_producto",
          "nombre_producto",
          "image",
          "peso",
          "valor_venta",
          "valor_compra",
        ],
        where: {
          producto_empresa: idBranch?.id,
          nombre_producto: {
            [Op.iLike]: conditions?.name ? `%${conditions?.name}%` : "%%",
          },
        },
        include: [
          {
            model: CATALOGO_UNIVERSAL,
            attributes: ["id_catalogo", "nombre_catalogo"],
            where: {
              nombre_catalogo: {
                [Op.iLike]: conditions?.type ? `%${conditions?.type}%` : "%%",
              },
            },
          },
        ],
      },
      {
        model: SUCURSAL,
        attributes: ["id_sucursal", "nombre_sucursal"],
        where: {
          nombre_sucursal: {
            [Op.iLike]: conditions?.sucursal
              ? `%${conditions?.sucursal}%`
              : "%%",
          },
        },
      },
    ],
    limit: limit,
    offset: offset,
  });
  const [count, products] = await Promise.all([countPromise, productsPromise]);
  if (!products.length) throw new Error("Not found products");

  return handlerFormatProducts(products, pageNumber, count, limit);
};

module.exports = {
  obtainAllProducts,
};
