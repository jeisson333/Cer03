const { getVendedor } = require("../controllers/controllerVendedor.js");

const getVendedorHandler = async (req, res) => {
  try {
    const response = await getVendedor();

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getVendedorHandler,
};
