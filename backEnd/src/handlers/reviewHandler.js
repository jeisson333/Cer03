const {
  postReviewController,
  getReviewController,
  putReviewController,
} = require("../controllers/controllerReview");

const postReviewHandler = async (req, res) => {
  try {
    const { title, score, description, branch } = req.body;

    if (!title || !score || !description || !branch)
      return res.status(400).json({ error: "Faltan datos" });

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
        .json({ error: "No se ha podido enviar la review" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getReviewHandler = async (req, res) => {
  try {
    const { branch } = req.body;

    const response = await getReviewController({ branch });

    if (response) return res.status(200).json(response);
    else
      return res
        .status(400)
        .json({ message: "No se ha encontrado ninguna review de la empresa" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const putReviewHandler = async (req, res) => {
  try {
    const { title, score, description, branch } = req.body;

    if (!title || !score || !description || !branch)
      return res.status(400).json({ error: "Faltan datos" });

    const response = await putReviewController({
      title,
      score,
      description,
      branch,
    });

    if (response)
      return res.status(200).json({
        message: "La review fue editada con exito, se agradece su tiempo",
      });
    else
      return res
        .status(400)
        .json({ error: "No se ha podido enviar la review" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postReviewHandler,
  getReviewHandler,
  putReviewHandler,
};
