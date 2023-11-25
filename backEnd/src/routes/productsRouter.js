const { Router } = require("express");

const { getAllProducts } = require("../handlers/handlerProducts");

productsRouter = Router();

productsRouter.get("/", getAllProducts);

module.exports = productsRouter;
