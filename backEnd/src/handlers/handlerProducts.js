const {
  obtainAllProducts,
  disableProduct,
  enableProduct,
  updateProduct,
} = require("../controllers/controllerAllProducts.js");
const { newProduct } = require("../controllers/newProduct.js");
const cloudinary = require("cloudinary").v2;

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
    const result = await cloudinary.uploader.upload(values?.image);

    //res.send('Form data received!');

    const response = await newProduct({ values, result });

    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id_producto, nombre_sucursal } = req.query;
    const response = await disableProduct({
      id_producto,
      nombre_sucursal,
    });
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const restoreProduct = async (req, res) => {
  try {
    const { id_inventario_producto } = req.body;
    const response = await enableProduct({ id_inventario_producto });
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
  deleteProduct,
  restoreProduct,
  editProductHandler,
};
