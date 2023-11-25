const { Router } = require("express");

const {
  getAllProducts,
  postNewProduct,
} = require("../handlers/handlerProducts");

productsRouter = Router();

productsRouter.post("/", getAllProducts);
productsRouter.post("/newproduct", postNewProduct);

module.exports = productsRouter;
