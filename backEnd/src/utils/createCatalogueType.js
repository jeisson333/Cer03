const { CATALOGO_UNIVERSAL } = require("../database/db");

const createCatalogueType = () => {
  const [catalogue, created] = CATALOGO_UNIVERSAL.findOrCreate({
    where: {
      nombre_catalogo: "tipo_catalogo",
    },
  });
  //   console.log(Object.keys(catalogue_type));
  // catalogue_type.setCATALOGO_UNIVERSAL();
};

console.log(createCatalogueType());

module.exports = createCatalogueType;
