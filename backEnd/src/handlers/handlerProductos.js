const { getProductos } = require("../controllers/controllerProductos.js");

const getProductosHandler = async (req, res) => {
  try {
    const { branch } = req.query; //branch = sucursal

    const response = await getProductos(branch);

    if (!response) return "not sucursal";

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProductosHandler,
};
