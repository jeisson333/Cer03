const { getEmpresa } = require("../controllers/controllerEmpresa.js");

const getEmpresaHandler = async (req, res) => {
  try {
    const response = await getEmpresa();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getEmpresaHandler,
};
