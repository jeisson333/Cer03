const { Router } = require("express");

const { getAllProducts } = require("../handlers/getProducts");

productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.post("/", postNewProduct);

module.exports = productsRouter;
