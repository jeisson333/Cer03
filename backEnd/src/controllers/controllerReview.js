const { REVIEW } = require("../database/db");

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

const getReviewController = async ({ branch }) => {
  const find = await REVIEW.findOne({
    where: {
      empresa_review: branch,
    },
    attributes: [
      "id_review",
      "titulo_review",
      "descripcion_review",
      "score_review",
      "createdAt",
    ],
  });

  return find;
};

module.exports = {
  postReviewController,
  getReviewController,
};
