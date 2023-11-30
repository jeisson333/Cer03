const { Router } = require("express");

const {
  getPaymentGateways,
  getSuccess,
  getFailure,
  getPending,
  getWebHook,
} = require("../handlers/handlerPaymentGateways.js");

routePaymentGateways = Router();

routePaymentGateways.post("/", getPaymentGateways);
routePaymentGateways.get("/success", getSuccess);
routePaymentGateways.get("/failure", getFailure);
routePaymentGateways.get("/pending", getPending);
routePaymentGateways.post("/webhook", getWebHook);

module.exports = routePaymentGateways;
