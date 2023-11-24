const { getVentas } = require("../controllers/controllerVentas.js");

const getVentasHandler = async (req, res) => {
  try {
    const response = await getVentas();

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getVentasHandler,
};
