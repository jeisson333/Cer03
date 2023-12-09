const { Router } = require('express');
const multer = require('multer'); // Middleware para gestionar archivos para cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

const {
	getAllProducts,
	postNewProduct,
} = require('../handlers/handlerProducts');

productsRouter = Router();

productsRouter.post('/', getAllProducts);
productsRouter.post('/newproduct', upload.single('imagen'), postNewProduct);

module.exports = productsRouter;
