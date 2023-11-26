const { getVentas } = require("../controllers/controllerVentas.js");

const getVentasHandler = async (req, res) => {
  try {
    const conditions = req.query;
    const idBranch = req.body;
    const response = await getVentas({ conditions, idBranch });

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getVentasHandler,
};
