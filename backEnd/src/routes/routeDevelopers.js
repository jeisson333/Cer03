const { Router } = require("express");
const {
  postSingUpDevelopersHandler,
  postSingInDevelopersHandler,
  getTotalBranchsHandler,
  deleteEmpresaHandler,
  restoreEmpresaHandler,
  getDisabledEmpresasHandler,
} = require("../handlers/handlersDevelopers");

routeDevelopers = Router();

// sesion
routeDevelopers.post("/sing-up", postSingUpDevelopersHandler);
routeDevelopers.post("/sing-in", postSingInDevelopersHandler);

// info
routeDevelopers.get("/", getTotalBranchsHandler);

routeDevelopers.delete("/delete", deleteEmpresaHandler);
routeDevelopers.put("/restore", restoreEmpresaHandler);
routeDevelopers.get("/disabled-empresas", getDisabledEmpresasHandler);

module.exports = routeDevelopers;
