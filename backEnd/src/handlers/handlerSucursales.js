const {
  controllerAllSucursales,
  controllerCreateSucursales,
} = require("../controllers/controllerAllSucursales.js");

const getAllSucursales = async (req, res) => {
  try {
    const conditions = req.query;
    const idBranch = req.body;

    const response = await controllerAllSucursales(conditions, idBranch);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postNewSucursales = async (req, res) => {
  try {
    const { nombre_sucursales, idBranch } = req.body;

    if (!nombre_sucursales?.length || !idBranch)
      res.status(400).json({ error: "Faltan datos" });

    await controllerCreateSucursales({
      nombre_sucursales,
      idBranch,
    });

    return res
      .status(200)
      .json({ message: "Las sucursales fueron creadas con exito" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllSucursales,
  postNewSucursales,
};
