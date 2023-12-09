const { Router } = require("express");

const {
  getAllProducts,
  postNewProduct,
  editProductHandler,
} = require("../handlers/handlerProducts");

productsRouter = Router();

productsRouter.post("/", getAllProducts);
productsRouter.post("/newproduct", postNewProduct);
productsRouter.put("/:id", editProductHandler);

module.exports = productsRouter;
