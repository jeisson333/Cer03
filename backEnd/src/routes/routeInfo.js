const { Router } = require("express");

// const { postEmail } = require("../handlers/handlerEmail.js");
const {
  getGananciaSucursalesHandler,
  getCantidadVendedoresHandler,
} = require("../handlers/handlerInfo");

routeInfo = Router();

routeInfo.post("/ganancia-sucursales", getGananciaSucursalesHandler);
routeInfo.post("/cantidad-vendedores", getCantidadVendedoresHandler);

module.exports = routeInfo;
