const { Router } = require("express");

const {
  getAllSucursales,
  postNewSucursales,
} = require("../handlers/handlerSucursales.js");

routeSucursales = Router();

routeSucursales.post("/", getAllSucursales);
routeSucursales.post("/post-sucursales", postNewSucursales);

module.exports = routeSucursales;
