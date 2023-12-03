const { Router } = require("express");

const {
  getPaymentGateways,
  getWebHook,
} = require("../handlers/handlerPaymentGateways.js");

routePaymentGateways = Router();

routePaymentGateways.post("/", getPaymentGateways);
routePaymentGateways.post("/webhook", getWebHook);

module.exports = routePaymentGateways;
