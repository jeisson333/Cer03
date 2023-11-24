const { obtainAllProducts } = require("../controllers/obtainAllProducts.js");

const getAllProducts = async (req, res) => {
  try {
    const { branch } = req.query; //branch = sucursal

    const response = await obtainAllProducts(branch);

    if (!response.length) return res.status(400).send("not sucursal");

    res.status(200).json(response); //objects array
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
};
