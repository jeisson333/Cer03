const { obtainAllProducts } = require("../controllers/obtainAllProducts.js");

const getAllProducts = async (req, res) => {
  try {
    const { branch } = req.query; //branch = sucursal

    if (!branch) return res.status(400).send("Not branch");

    const response = await obtainAllProducts(branch);

    if (!response.length)
      return res.status(400).send("Branch products not founds");

    res.status(200).json(response); //objects array
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
};
