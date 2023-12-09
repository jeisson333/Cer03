const {
  getCatalogo_universal,
} = require("../controllers/catalogo_Universal/getCatalogo_universal");
const postCatalogoUniversal = require("../controllers/catalogo_Universal/postCatalogo_universal");

const getAllCatalogos = async (req, res) => {
  try {
    const conditions = req.query;
    const response = await getCatalogo_universal(conditions);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postNewCatalogo = async (req, res) => {
  try {
    const { names, catalogue_type } = req.body;

    if (!names?.length || !catalogue_type)
      return res.status(400).json({ error: "Faltan datos" });

    const catalogue = await postCatalogoUniversal({ names, catalogue_type });

    return res.status(200).json(catalogue);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllCatalogos,
  postNewCatalogo,
};
