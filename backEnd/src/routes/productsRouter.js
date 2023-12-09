const { Router } = require("express");

const {
  getAllProducts,
  postNewProduct,
  deleteProduct,
  restoreProduct,
} = require("../handlers/handlerProducts");

productsRouter = Router();

productsRouter.post("/", getAllProducts);
productsRouter.post("/newproduct", postNewProduct);
productsRouter.delete("/", deleteProduct);
productsRouter.post("/restoreproduct", restoreProduct);

module.exports = productsRouter;
