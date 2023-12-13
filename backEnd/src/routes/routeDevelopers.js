const { Router } = require("express");
const {
  postSingUpDevelopersHandler,
  postSingInDevelopersHandler,
  getTotalBranchsHandler,
} = require("../handlers/handlersDevelopers");

routeDevelopers = Router();

// sesion
routeDevelopers.post("/sing-up", postSingUpDevelopersHandler);
routeDevelopers.post("/sing-in", postSingInDevelopersHandler);

// info
routeDevelopers.get("/", getTotalBranchsHandler);

module.exports = routeDevelopers;
