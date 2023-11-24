const { PRODUCTO } = require("../database/db");
// const { Op } = require("sequelize");

const obtainAllProducts = async (branch) => {
  let products = await PRODUCTO.findAll({
    where: {
      producto_empresa: branch, //all products --> branch
    },
  });

  return products;
};

module.exports = {
  obtainAllProducts,
};
