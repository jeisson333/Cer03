const jsonInfo = require("../../utils/json/productos.json");
const inventory = require("../../utils/json/inventario_producto.json");
const { PRODUCTO, INVENTARIO_PRODUCTO } = require("../../database/db");

const saveProducto = async () => {
  for (const register of jsonInfo) {
    let [producto] = await PRODUCTO.findOrCreate({
      where: register,
    });
    producto.setCATALOGO_UNIVERSAL(register?.tipo_producto);
    producto.setEMPRESA(register?.producto_empresa);
  }

  for (const register of inventory) {
    let [inventario] = await INVENTARIO_PRODUCTO.findOrCreate({
      where: register,
    });
    inventario.setPRODUCTO(register?.inventario_producto);
    inventario.setSUCURSAL(register?.inventario_sucursal);
  }
};

module.exports = {
  saveProducto,
};
