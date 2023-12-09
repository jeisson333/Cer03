const { Router } = require("express");

const {
  getAllProducts,
  postNewProduct,
  deleteProduct,
  restoreProduct,
  editProductHandler,
} = require("../handlers/handlerProducts");

productsRouter = Router();

productsRouter.post("/", getAllProducts);
productsRouter.post("/newproduct", postNewProduct);
productsRouter.delete("/", deleteProduct);
productsRouter.post("/restoreproduct", restoreProduct);
productsRouter.put("/:id", editProductHandler);

module.exports = productsRouter;
