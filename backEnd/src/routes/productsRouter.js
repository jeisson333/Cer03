const { Router } = require("express");

const {
  getAllProducts,
  postNewProduct,
} = require("../handlers/handlerProducts");

productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.post("/", postNewProduct);

module.exports = productsRouter;
