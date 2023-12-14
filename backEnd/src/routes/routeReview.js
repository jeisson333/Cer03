const { Router } = require("express");

// const {
//   getPaymentSales,
//   getWebHook,
// } = require("../handlers/handlerPaymentSales.js");
const {
  postReviewHandler,
  getReviewHandler,
  putReviewHandler,
  getReviewsHandler,
} = require("../handlers/reviewHandler");

routeReview = Router();

routeReview.post("/post", postReviewHandler);
routeReview.post("/get", getReviewHandler);
routeReview.put("/edit", putReviewHandler);
routeReview.get("/", getReviewsHandler);
// routeSales.post("/", getPaymentSales);
// routeSales.post("/webhook", getWebHook);

module.exports = routeReview;
