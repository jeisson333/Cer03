const { Router } = require("express");

const {
  getVendedorHandlerIdentityCard,
  getVendedorHandlerName,
} = require("../handlers/handlerVendedor.js");

routeVendedor = Router();

routeVendedor.get("/idCard", getVendedorHandlerIdentityCard);
routeVendedor.get("/name", getVendedorHandlerName);

module.exports = routeVendedor;
