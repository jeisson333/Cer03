const { Router } = require("express");

// const {
//   getPaymentSales,
//   getWebHook,
// } = require("../handlers/handlerPaymentSales.js");
const {
  postReviewHandler,
  getReviewHandler,
} = require("../handlers/reviewHandler");

routeReview = Router();

routeReview.post("/post", postReviewHandler);
routeReview.post("/get", getReviewHandler);
// routeSales.post("/", getPaymentSales);
// routeSales.post("/webhook", getWebHook);

module.exports = routeReview;
