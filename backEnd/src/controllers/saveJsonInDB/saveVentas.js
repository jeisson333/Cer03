const jsonInfo = require("../../utils/json/ventas.json");
const details = require("../../utils/json/detalles_venta.json");
const { VENTA, DETALLES_VENTA } = require("../../database/db");

const saveVenta = async () => {
  for (const register of jsonInfo) {
    let [venta] = await VENTA.findOrCreate({
      where: register,
    });
    venta.setCATALOGO_UNIVERSAL(register?.metodo_pago);
    venta.setSUCURSAL(register?.venta_sucursal);
  }

  for (const register of details) {
    let [detalle] = await DETALLES_VENTA.findOrCreate({
      where: register,
    });
    detalle.setPRODUCTO(register?.venta_producto);
    detalle.setVENTum(register?.detalles_venta);
  }
};

module.exports = {
  saveVenta,
};
