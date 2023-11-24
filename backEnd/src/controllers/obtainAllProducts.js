const { PRODUCTO } = require("../database/db");
// const { Op } = require("sequelize");

const obtainAllProducts = async (branch) => {
  let products = [];

  let productsFound = await PRODUCTO.findAll({
    where: {
      producto_empresa: branch, //all products --> branch
    },
  });

  productsFound.forEach((product) => {
    products.push({
      id: product.id_producto,
      nombre: product.nombre_producto,
      valor_venta: product.valor_venta,
      valor_compra: product.valor_compra,
      tipo: product.tipo_producto,
    });
  });

  return products;
};

module.exports = {
  obtainAllProducts,
};
