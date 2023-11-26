const jsonInfo = require("../../utils/json/sucursales.json");
const contact = require("../../utils/json/contacto_sucursal.json");
const { SUCURSAL, CONTACTO_SUCURSAL } = require("../../database/db");

const saveSucursal = async () => {
  for (const register of jsonInfo) {
    let [sucursal] = await SUCURSAL.findOrCreate({
      where: register,
    });
    sucursal.setEMPRESA(register?.sucursal_empresa);
  }

  for (const register of contact) {
    let [contacto] = await CONTACTO_SUCURSAL.findOrCreate({
      where: register,
    });
    contacto.setSUCURSAL(register?.contacto_sucursal);
    contacto.setCATALOGO_UNIVERSAL(register?.tipo_contacto);
  }
};

module.exports = {
  saveSucursal,
};
