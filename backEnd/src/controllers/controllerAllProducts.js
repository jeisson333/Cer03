const {
  PRODUCTO,
  CATALOGO_UNIVERSAL,
  INVENTARIO_PRODUCTO,
  SUCURSAL,
} = require("../database/db");
const { Op } = require("sequelize");
const { handlerFilters, handlerApiFormat } = require("./controllerPages");

const obtainAllProducts = async ({ conditions, idBranch }) => {
  if (!idBranch?.id) throw new Error("Not branch id");

  const [pageNumber, limit, offset] = handlerFilters({
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
    order: [
      [
        PRODUCTO,
        conditions?.orderName ? `${conditions?.orderName}` : "id_producto",
        conditions?.order ? `${conditions?.order.toUpperCase()}` : "ASC",
      ],
    ],
    limit: limit,
    offset: offset,
  });

  const [count, products] = await Promise.all([countPromise, productsPromise]);

  if (!products.length) throw new Error("Not found products");

  return handlerApiFormat(products, pageNumber, count, limit);
};

module.exports = {
  obtainAllProducts,
};
