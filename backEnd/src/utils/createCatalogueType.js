const { CATALOGO_UNIVERSAL } = require("../database/db");

const createCatalogueType = async () => {
  let [catalogo] = await CATALOGO_UNIVERSAL.findOrCreate({
    where: {
      id_catalogo: "b068887b-8f56-4421-a66d-e1dd964db7f5",
      nombre_catalogo: "tipo_catalogo",
    },
  });
  catalogo.setCATALOGO_UNIVERSAL(catalogo?.id_catalogo);
};

module.exports = createCatalogueType;
