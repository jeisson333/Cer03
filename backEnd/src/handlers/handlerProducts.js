const { response } = require("express");
const {
  obtainAllProducts,
  updateProduct,
} = require("../controllers/controllerAllProducts.js");
const { newProduct } = require("../controllers/newProduct.js");

const getAllProducts = async (req, res) => {
  try {
    const conditions = req.query;
    const idBranch = req.body;
    const response = await obtainAllProducts({ conditions, idBranch });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postNewProduct = async (req, res) => {
  try {
    const values = req.body;
    const response = await newProduct({ values });

    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editProductHandler = async (req, res) => {
  try {
    const id_producto = req.params;
    const conditions = req.query;

    const response = await updateProduct({ id_producto, conditions });
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  postNewProduct,
  editProductHandler,
};
