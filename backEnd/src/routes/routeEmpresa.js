const { Router } = require("express");
const {
  getEmpresaHandler,
  postEmpresaHandler,
} = require("../handlers/handlerEmpresa.js");

routeEmpresa = Router();

routeEmpresa.post("/sign-up", postEmpresaHandler);
routeEmpresa.get("/", getEmpresaHandler);

module.exports = routeEmpresa;
