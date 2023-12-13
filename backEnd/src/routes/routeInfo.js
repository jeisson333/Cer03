const { Router } = require("express");

// const { postEmail } = require("../handlers/handlerEmail.js");
const { getGananciaSucursalesHandler } = require("../handlers/handlerInfo");

routeInfo = Router();

routeInfo.post("/ganancia-sucursales", getGananciaSucursalesHandler);

module.exports = routeInfo;
