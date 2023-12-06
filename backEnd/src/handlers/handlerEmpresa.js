const {
  getEmpresa,
  postEmpresa,
} = require("../controllers/controllerEmpresa.js");

const postEmpresaHandler = async (req, res) => {
  try {
    const { nombre_empresa, email, password } = req.body;
    const response = await postEmpresa({ nombre_empresa, email, password });

    return res.status(200).json({ message: response });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

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
  postEmpresaHandler,
};
