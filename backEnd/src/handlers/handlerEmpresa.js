const {
  getEmpresa,
  postEmpresa,
} = require("../controllers/controllerEmpresa.js");
const { singIn } = require("../controllers/controllerAuth.js");

const postEmpresaHandler = async (req, res) => {
  try {
    const { nombre_empresa, email, password } = req.body;
    const complete = await postEmpresa({ nombre_empresa, email, password });

    if (complete === "Se ha creado la empresa") {
      const response = await singIn(email, password);

      return res.status(200).json(response);
    }

    return res.status(200).json({ message: complete });
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
