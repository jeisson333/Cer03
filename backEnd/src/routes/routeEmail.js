const { Router } = require("express");

const { postEmail } = require("../handlers/handlerEmail.js");

routeEmail = Router();

routeEmail.post("/", postEmail);

module.exports = routeEmail;
