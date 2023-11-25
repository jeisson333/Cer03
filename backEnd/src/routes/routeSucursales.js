const { Router } = require("express");

const {
  getAllSucursales,
  //   getSucursalesByNameEmpresaHandler,
} = require("../handlers/handlerSucursales.js");

routeSucursales = Router();

routeSucursales.get("/", getAllSucursales);
// routeSucursales.get("/nameEmpresa", getSucursalesByNameEmpresaHandler); //no deberia poder hacerse

module.exports = routeSucursales;
