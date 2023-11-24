const { getEmpresa } = require("../controllers/controllerEmpresa.js");

const getEmpresaHandler = async (req, res) => {
  try {
    const response = await getEmpresa();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//para el get empresa nos tenemos que meter con los token y las auth de terceros

module.exports = {
  getEmpresaHandler,
};
