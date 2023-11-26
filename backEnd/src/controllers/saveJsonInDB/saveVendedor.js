const jsonInfo = require("../../utils/json/vendedores.json");
const { VENDEDOR } = require("../../database/db");

const saveSaleMen = async () => {
  for (const register of jsonInfo) {
    let [vendedor] = await VENDEDOR.findOrCreate({
      where: register,
    });
    vendedor.setCATALOGO_UNIVERSAL(register?.tipo_documento);
    vendedor.setSUCURSAL(register?.vendedor_sucursal);
  }
};

module.exports = {
  saveSaleMen,
};
