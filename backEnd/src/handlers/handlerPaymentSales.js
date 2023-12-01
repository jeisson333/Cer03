const {
	getMercadoPagoSalesController,
	getWebHookController,
} = require('../controllers/controllerPaymentSales.js');

const getPaymentSales = async (req, res) => {
	try {
		const info = req.query;
		const response = await getMercadoPagoSalesController({ info });
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
const getWebHook = async (req, res) => {
	try {
		const response = await getWebHookController(req.query);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getPaymentSales,
	getWebHook,
};
