const { Router } = require("express");

const { getVendedorHandler } = require("../handlers/handlerVendedor.js");

routeVendedor = Router();

routeVendedor.get("/", getVendedorHandler);

module.exports = routeVendedor;
