const { Router } = require("express");

const { getVentasHandler } = require("../handlers/handlerVentas.js");

routeVentas = Router();

routeVentas.get("/", getVentasHandler);

module.exports = routeVentas;
