const { PRODUCTO, CATALOGO_UNIVERSAL, EMPRESA } = require("../database/db");
// const { Op } = require("sequelize");

const obtainAllProducts = async (branch) => {
  let products = [];

  let productsFound = await PRODUCTO.findAll({
    attributes: [
      "id_producto",
      "nombre_producto",
      "image",
      "peso",
      "valor_venta",
      "valor_compra",
    ],
    where: {
      producto_empresa: branch, //all products --> branch
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

  // productsFound.forEach((product) => {
  //   products.push({
  //     id: product.id_producto,
  //     nombre: product.nombre_producto,
  //     valor_venta: product.valor_venta,
  //     valor_compra: product.valor_compra,
  //     tipo: product.tipo_producto,
  //   });
  // });

  return productsFound;
};

module.exports = {
  obtainAllProducts,
};
