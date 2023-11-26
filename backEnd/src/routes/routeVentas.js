const { Router } = require("express");

const { getVentasHandler } = require("../handlers/handlerVentas.js");

routeVentas = Router();

routeVentas.post("/", getVentasHandler);

module.exports = routeVentas;
