const mercadopage = require('mercadopago');
const { ACCESS_TOKEN } = process.env;

const getMercadoPagoSalesController = async ({ products }) => {
	//const { nombre_producto, totalPay, currency, quantity, description } = info;

	mercadopage.configure({
		access_token: ACCESS_TOKEN,
	});

	const preference = {
		items: products?.map((product) => {
			return {
				title: product.nombre_producto,
				unit_price: parseInt(product.totalPay),
				currency_id: product.currency,
				quantity: parseInt(product.quantity),
			};
		}),
		auto_return: 'approved',
		back_urls: {
			success: 'http://localhost:5173/paymentSales/success',
			failure: 'http://localhost:5173/paymentSales/failure',
			pending: 'http://localhost:5173/paymentSales/pending',
		},
		notification_url:
			'https://5942-45-238-182-200.ngrok.io/paymentSales/webhook',
	};

	const response = await mercadopage.preferences.create(preference);

	return response;
};
const getWebHookController = async (infoQuery) => {
	if (infoQuery.type === 'payment') {
		const data = await mercadopage.payment.findById(infoQuery['data.id']);
		console.log(data);
	}
	return data;
};

module.exports = {
	getMercadoPagoSalesController,
	getWebHookController,
};
