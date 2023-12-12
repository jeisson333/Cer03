const { saveCatalogo } = require("./saveCatalogo");
const { saveEmpresa } = require("./saveEmpresa");
const { saveProducto } = require("./saveProducto");
const { saveSucursal } = require("./saveSucursal");
const { saveSaleMen } = require("./saveVendedor");
const { saveVenta } = require("./saveVentas");

const saveJsonInDB = () => {
  saveCatalogo()
    .then(() => {
      return saveEmpresa();
    })
    .then(() => {
      return saveSucursal();
    })
    .then(() => {
      return saveProducto();
    })
    .then(() => {
      return saveSaleMen();
    })
    .then(() => {
      return saveVenta();
    })
    .catch((error) => {
      throw new Error(error);
    });
  //   await Promise.all([productoPromise]);
};

module.exports = {
  saveJsonInDB,
};
