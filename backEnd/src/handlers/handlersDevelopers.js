const {
  singUpDeveloper,
  singInDeveloper,
  getTotalBranchsController,
  deleteEmpresaController,
  restoreEmpresaController,
  getDisabledEmpresasController,
} = require("../controllers/controllerDevelopers");

//const { singIn } = require('../controllers/controllerAuth.js');

const postSingUpDevelopersHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const body = req.body;

    console.log(body, "handlerrrrr");
    const complete = await singUpDeveloper({ email, password });

    if (complete === "este usuario ya existe") {
      return res
        .status(400)
        .json({ error: "este usuario ya se encuentra registrado" });
    }

    return res.status(200).json({ message: complete });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postSingInDevelopersHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("aqui:", email, password);
    const response = await singInDeveloper({ email, password });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getTotalBranchsHandler = async (req, res) => {
  try {
    const response = await getTotalBranchsController();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteEmpresaHandler = async (req, res) => {
  try {
    const { branch } = req.query;

    if (!branch) return res.status(400).json({ error: "Faltan datos" });

    await deleteEmpresaController({ branch });

    return res.status(200).json({ message: "Empresa baneada con exito" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const restoreEmpresaHandler = async (req, res) => {
  try {
    const { branch } = req.query;

    if (!branch) return res.status(400).json({ error: "Faltan datos" });

    await restoreEmpresaController({ branch });

    return res.status(200).json({ message: "Empresa restaurada con exito" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getDisabledEmpresasHandler = async (req, res) => {
  try {
    const response = await getDisabledEmpresasController();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postSingUpDevelopersHandler,
  postSingInDevelopersHandler,
  getTotalBranchsHandler,
  deleteEmpresaHandler,
  restoreEmpresaHandler,
  getDisabledEmpresasHandler,
};
