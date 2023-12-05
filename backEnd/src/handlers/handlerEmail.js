const { postEmailController } = require("../controllers/controllerEmail.js");

const postEmail = async (req, res) => {
  try {
    const data = req.body;
    const response = await postEmailController({ data });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postEmail,
};
