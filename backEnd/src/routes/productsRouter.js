const { Router } = require("express");
const multer = require("multer"); // Middleware para gestionar archivos para cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

const {
  getAllProducts,
  postNewProduct,
  deleteProduct,
  restoreProduct,
  editProductHandler,
} = require("../handlers/handlerProducts");

productsRouter = Router();

productsRouter.post("/", getAllProducts);
productsRouter.post("/newproduct", upload.single("imagen"), postNewProduct);
productsRouter.delete("/", deleteProduct);
productsRouter.post("/restoreproduct", restoreProduct);
productsRouter.put("/:id", editProductHandler);

module.exports = productsRouter;
