const { CATALOGO_UNIVERSAL } = require("../database/db");

const createCatalogueType = async () => {
  let [catalogo] = await CATALOGO_UNIVERSAL.findOrCreate({
    where: {
      nombre_catalogo: "tipo_catalogo",
    },
  });
  catalogo.setCATALOGO_UNIVERSAL(catalogo?.id_catalogo);
};

module.exports = createCatalogueType;
