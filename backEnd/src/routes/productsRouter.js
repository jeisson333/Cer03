const { Router } = require("express");

const { getAllProducts } = require("../handlers/getProducts");

productsRouter = Router();

productsRouter.get("/", getAllProducts);

module.exports = productsRouter;
