const { obtainAllProducts } = require("../controllers/obtainAllProducts.js");

const getAllProducts = async (req, res) => {
  try {
    const { branch } = req.query; //branch = sucursal

    if (!branch) throw new Error("Not branch");
    // return res.status(400).json({ error: "" });

    const response = await obtainAllProducts(branch);

    if (!response.length) throw new Error("Not found branch products");

    return res.status(200).json(response); //objects array
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
};
