const { Router } = require("express");
const { singInHandler } = require("../handlers/handlerAuth.js");

routeAuth = Router();

routeAuth.post("/sing-in", singInHandler);
module.exports = routeAuth;
