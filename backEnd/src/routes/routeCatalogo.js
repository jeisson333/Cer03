const { Router } = require("express");

const {
  getAllCatalogos,
  //   getSucursalesByNameEmpresaHandler,
} = require("../handlers/handlerCatalogo");

routeCatalogos = Router();

routeCatalogos.get("/", getAllCatalogos);

module.exports = routeCatalogos;
