const { Router } = require("express");
const {
  getEmpresaHandler,
  postEmpresaHandler,
  updateEmpresaHandler,
} = require("../handlers/handlerEmpresa.js");

routeEmpresa = Router();

routeEmpresa.post("/sign-up", postEmpresaHandler);
routeEmpresa.get("/", getEmpresaHandler);
routeEmpresa.put("/", updateEmpresaHandler);

module.exports = routeEmpresa;
