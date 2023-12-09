const { CATALOGO_UNIVERSAL } = require("../../database/db");

const postCatalogoUniversal = async ({ names, catalogue_type }) => {
  names?.forEach(async (name) => {
    const [created] = await CATALOGO_UNIVERSAL.findOrCreate({
      where: {
        nombre_catalogo: name,
        tipo_catalogo: catalogue_type,
      },
    });

    if (created) created.setCATALOGO_UNIVERSAL(catalogue_type);
  });

  const allType = await CATALOGO_UNIVERSAL.findAll({
    attributes: ["id_catalogo", "nombre_catalogo"],
    where: {
      tipo_catalogo: catalogue_type,
    },
  });

  return allType;
};

module.exports = postCatalogoUniversal;
