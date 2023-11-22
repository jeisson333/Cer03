const { Router } = require("express");

const { getProductosHandler } = require("../handlers/handlerProductos.js");

routeProductos = Router();

routeProductos.get("/", getProductosHandler);

module.exports = routeProductos;
