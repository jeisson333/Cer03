const { Router } = require("express");

const { handlerSaveJsonInDB } = require("../handlers/handlerSaveJsonInDB");

routeSaveJsonInDB = Router();

routeSaveJsonInDB.get("/", handlerSaveJsonInDB);

module.exports = routeSaveJsonInDB;
