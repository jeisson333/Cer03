const {
  getCatalogo_universal,
} = require("../controllers/catalogo_Universal/getCatalogo_universal");

const getAllCatalogos = async (req, res) => {
  try {
    const conditions = req.query;
    const response = await getCatalogo_universal(conditions);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllCatalogos,
  //   getSucursalesByNameEmpresaHandler,
};
