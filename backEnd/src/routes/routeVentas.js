const { Router } = require("express");

const {
  getVentasHandler,
  postVentasHandler,
} = require("../handlers/handlerVentas.js");

routeVentas = Router();

routeVentas.post("/", getVentasHandler);
routeVentas.post("/nuevaventa", postVentasHandler);

module.exports = routeVentas;
