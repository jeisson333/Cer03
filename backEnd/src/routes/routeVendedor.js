const { Router } = require("express");

const {
  getVendedorHandlerIdentityCard,
  getVendedorHandlerName,
  postVendedorHandler,
} = require("../handlers/handlerVendedor.js");

routeVendedor = Router();

routeVendedor.get("/idCard", getVendedorHandlerIdentityCard);
routeVendedor.get("/name", getVendedorHandlerName);
routeVendedor.post("/newClient", postVendedorHandler);

module.exports = routeVendedor;
