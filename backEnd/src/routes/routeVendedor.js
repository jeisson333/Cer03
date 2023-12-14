const { Router } = require("express");

const {
  getVendedorHandlerIdentityCard,
  getVendedorHandlerName,
  postVendedorHandler,
  deleteVendedor,
  restoreVendedor,
} = require("../handlers/handlerVendedor.js");

routeVendedor = Router();

routeVendedor.get("/idCard", getVendedorHandlerIdentityCard);
routeVendedor.get("/name", getVendedorHandlerName);
routeVendedor.post("/newClient", postVendedorHandler);
routeVendedor.delete("/", deleteVendedor);
routeVendedor.post("/restoreproduct", restoreVendedor);

module.exports = routeVendedor;
