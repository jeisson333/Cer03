const { REVIEW, EMPRESA } = require("../database/db");

const postReviewController = async ({ title, score, description, branch }) => {
  const find = await REVIEW.findOne({
    where: {
      empresa_review: branch,
    },
  });

  if (!find) {
    const created = await REVIEW.create({
      titulo_review: title,
      score_review: score,
      descripcion_review: description,
      empresa_review: branch,
    });

    if (created) {
      created.setEMPRESA(branch);
      return created;
    }
  }
};

const getReviewController = async () => {
  const find = await REVIEW.findAll({
    attributes: [
      "id_review",
      "titulo_review",
      "descripcion_review",
      "score_review",
      "createdAt",
    ],
    include: [
      {
        model: EMPRESA,
        attributes: ["nombre_empresa"],
      },
    ],
  });

  return find;
};

module.exports = {
  postReviewController,
  getReviewController,
};
