const { PRODUCTO, CATALOGO_UNIVERSAL, EMPRESA } = require("../database/db");
const { Op } = require("sequelize");

const handleFiltersProducts = ({ conditions }) => {
  let pageNumber = parseInt(conditions?.page) || 0;
  let limit = parseInt(conditions?.pageSize) || 2;
  let offset = Math.max(0, pageNumber - 1) * limit;
  return [pageNumber, limit, offset];
};

const obtainAllProducts = async ({ conditions, idBranch }) => {
  if (!idBranch?.id) throw new Error("The query need Product's branch");
  const [pageNumber, limit, offset] = handleFiltersProducts({
    conditions,
  });
  const countPromise = PRODUCTO.count({
    where: { producto_empresa: idBranch?.id },
  });
  const productsPromise = PRODUCTO.findAll({
    limit: limit,
    offset: offset,
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
      {
        model: EMPRESA,
        attributes: ["nombre_empresa"],
      },
    ],
  });
  const [count, products] = await Promise.all([countPromise, productsPromise]);
  if (!products.length) throw new Error("Not found products");

  return handlerFormatProducts({ products, pageNumber, count, limit });
};

const handlerFormatProducts = ({ products, pageNumber, count, limit }) => {
  return {
    info: {
      count: count,
      currentPage: pageNumber,
      pages: Math.ceil(count / limit),
    },
    data: products,
  };
};

module.exports = {
  obtainAllProducts,
};
