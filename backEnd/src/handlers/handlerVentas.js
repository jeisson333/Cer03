const {
  getVentas,
  postVenta,
  getVentaDetail,
} = require("../controllers/controllerVentas.js");

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

const postVentasHandler = async (req, res) => {
  try {
    const body = req.body;
    const response = await postVenta({ body });

    res.status(200).json(response);
    // res.status(200).json({ message: "La compra ha sido realizada con exito" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getVentaDetailHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "Faltan datos" });

    const response = await getVentaDetail({ id });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getVentasHandler,
  postVentasHandler,
  getVentaDetailHandler,
};
