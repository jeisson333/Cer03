const jsonInfo = require("../../utils/json/catalogos.json");
const { CATALOGO_UNIVERSAL } = require("../../database/db");

const saveCatalogo = async () => {
  for (const register of jsonInfo) {
    let [catalogo] = await CATALOGO_UNIVERSAL.findOrCreate({
      where: register,
    });
    catalogo.setCATALOGO_UNIVERSAL(register?.tipo_catalogo);
  }
};

module.exports = {
  saveCatalogo,
};
