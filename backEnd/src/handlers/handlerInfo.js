const {
  getGananciaSucursalesController,
  getCantidadVendedoresController,
} = require("../controllers/controllerInfo");

const getGananciaSucursalesHandler = async (req, res) => {
  try {
    const conditions = req.query;
    const { branch } = req.body;

    if (!branch) return res.status(400).json({ error: "Faltan datos" });

    const response = await getGananciaSucursalesController({
      branch,
      conditions,
    });

    if (!response)
      return res
        .status(400)
        .json({ message: "No se encontro ninguna sucursal o venta" });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getCantidadVendedoresHandler = async (req, res) => {
  try {
    const { branch } = req.body;

    if (!branch) return res.status(400).json({ error: "Faltan datos" });

    const response = await getCantidadVendedoresController({ branch });

    if (!response)
      return res
        .status(400)
        .json({ message: "No se encontraron sucursales/vendedores" });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getGananciaSucursalesHandler,
  getCantidadVendedoresHandler,
};
