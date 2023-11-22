const { getProductos } = require("../controllers/controllerProductos.js");

const getProductosHandler = async (req, res) => {
  try {
    const { branch } = req.query; //branch = sucursal

    const response = await getProductos(branch);

    if (!response.length) return res.status(400).send("not sucursal");

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProductosHandler,
};
