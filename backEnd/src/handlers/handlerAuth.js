const { response } = require("express");
const { singIn } = require("../controllers/controllerAuth.js");

const singInHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).send("imcomplete information");
    }

    const response = await singIn(email, password);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  singInHandler,
};
