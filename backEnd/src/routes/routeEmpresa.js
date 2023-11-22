const { Router } = require("express");

const { getEmpresaHandler } = require("../handlers/handlerEmpresa.js");

routeEmpresa = Router();

routeEmpresa.get("/", getEmpresaHandler);

module.exports = routeEmpresa;
