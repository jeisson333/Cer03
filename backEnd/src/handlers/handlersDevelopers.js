const {
  singUpDeveloper,
  singInDeveloper,
} = require("../controllers/controllerDevelopers");

//const { singIn } = require('../controllers/controllerAuth.js');

const postSingUpDevelopersHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const body = req.body;

    console.log(body, "handlerrrrr");
    const complete = await singUpDeveloper({ email, password });

    if (complete === "este usuario ya existe") {
      return res
        .status(400)
        .json({ error: "este usuario ya se encuentra registrado" });
    }

    return res.status(200).json({ message: complete });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postSingInDevelopersHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await singInDeveloper({ email, password });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postSingUpDevelopersHandler,
  postSingInDevelopersHandler,
};
