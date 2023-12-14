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

const getReviewController = async ({ branch }) => {
  const find = await REVIEW.findOne({
    attributes: [
      "id_review",
      "titulo_review",
      "descripcion_review",
      "score_review",
      "createdAt",
    ],
    where: {
      empresa_review: branch,
    },
  });

  return find;
};

const putReviewController = async ({ title, score, description, branch }) => {
  const findReview = await REVIEW.findOne({
    where: {
      empresa_review: branch,
    },
  });

  findReview.set({
    titulo_review: title,
    score_review: score,
    descripcion_review: description,
  });

  await findReview.save();

  return findReview;
};

const getReviewsController = async () => {
  const finds = await REVIEW.findAll({
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

  return finds;
};

module.exports = {
  postReviewController,
  getReviewController,
  putReviewController,
  getReviewsController,
};
