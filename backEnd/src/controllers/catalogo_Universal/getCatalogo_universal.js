const { CATALOGO_UNIVERSAL } = require("../../database/db");
const { handlerFilters, handlerApiFormat } = require("../controllerPages");

const getCatalogo_universal = async (conditions, idBranch) => {
  const [pageNumber, limit, offset] = handlerFilters({ conditions });

  const countPromise = CATALOGO_UNIVERSAL.findAll({
    where: {
      tipo_catalogo: conditions?.tipo_catalogo,
    },
  });

  const catalogoPromise = CATALOGO_UNIVERSAL.findAll({
    attributes: ["id_catalogo", "nombre_catalogo"],
    where: {
      tipo_catalogo: conditions?.tipo_catalogo,
    },
    limit: limit,
    offset: offset,
  });

  const [count, catalogos] = await Promise.all([countPromise, catalogoPromise]);

  if (!catalogos.length) throw new Error("Not found catalogos");

  return handlerApiFormat(catalogos, pageNumber, count.length, limit);
};

module.exports = {
  getCatalogo_universal,
};
