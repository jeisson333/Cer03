const { Router } = require("express");

const {
  getAllCatalogos,
  postNewCatalogo,
} = require("../handlers/handlerCatalogo");

routeCatalogos = Router();

routeCatalogos.get("/", getAllCatalogos);
routeCatalogos.post("/", postNewCatalogo);

module.exports = routeCatalogos;
