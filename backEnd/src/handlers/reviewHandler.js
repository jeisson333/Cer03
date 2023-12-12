const {
  postReviewController,
  getReviewController,
} = require("../controllers/controllerReview");

const postReviewHandler = async (req, res) => {
  try {
    const { title, score, description, branch } = req.body;

    if (!title || !score || !description || !branch)
      return res.status(400).json({ message: "Faltan datos" });

    const response = await postReviewController({
      title,
      score,
      description,
      branch,
    });

    if (response)
      return res.status(200).json({
        message: "Se ha enviado la review correctamente, agradecemos su tiempo",
      });
    else
      return res
        .status(400)
        .json({ message: "No se ha podido enviar la review" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getReviewHandler = async (req, res) => {
  try {
    const { branch } = req.body;

    if (!branch) return res.status(400).json({ message: "Faltan datos" });

    const response = await getReviewController({
      branch,
    });

    if (response) return res.status(200).json(response);
    else
      return res
        .status(400)
        .json({ message: "No se ha encontrado ninguna review de la empresa" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postReviewHandler,
  getReviewHandler,
};
