const {
	obtainAllProducts,
} = require('../controllers/controllerAllProducts.js');
const { newProduct } = require('../controllers/newProduct.js');
const cloudinary = require('cloudinary').v2;

const getAllProducts = async (req, res) => {
	try {
		const conditions = req.query;
		const idBranch = req.body;
		const response = await obtainAllProducts({ conditions, idBranch });

		return res.status(200).json(response);
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const postNewProduct = async (req, res) => {
	try {
		const values = req.body;
		const result = await cloudinary.uploader.upload(values?.image);

		console.log(result, 'holaaaa-------');

		//res.send('Form data received!');

		const response = await newProduct({ values, result });

		return res.status(200).json(response);
	} catch (error) {
		console.log('----123------', error);
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getAllProducts,
	postNewProduct,
};
