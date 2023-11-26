const { Router } = require("express");

const {
  getAllSucursales,
  //   getSucursalesByNameEmpresaHandler,
} = require("../handlers/handlerSucursales.js");

routeSucursales = Router();

routeSucursales.post("/", getAllSucursales);

module.exports = routeSucursales;
