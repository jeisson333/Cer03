const { PRODUCTO } = require("../db");
const { Op } = require("sequelize");

const getProductos = async (branch) => {
  let products = await PRODUCTO.findAll({
    where: {
      nombre_producto: {
        [Op.iLike]: `${branch}`,
      },
    },
  });

  return products;
};

module.exports = {
  getProductos,
};
