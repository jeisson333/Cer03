const mercadopage = require('mercadopago');
const { ACCESS_TOKEN } = process.env;

const getMercadoPagoSalesController = async ({ info }) => {
	const { nombre_producto, totalPay, currency, quantity } = info;

	mercadopage.configure({
		access_token: ACCESS_TOKEN,
	});

	const preference = {
		items: [
			{
				title: nombre_producto,
				unit_price: parseInt(totalPay),
				currency_id: currency,
				quantity: parseInt(quantity),
			},
		],
		auto_return: 'approved',
		back_urls: {
			success: 'http://localhost:5173/paymentSales/success',
			failure: 'http://localhost:5173/paymentSales/failure',
			pending: 'http://localhost:5173/paymentSales/pending',
		},
		notification_url:
			'https://5942-45-238-182-200.ngrok.io/paymentSales/webhook',
	};

	const result = await mercadopage.preferences.create(preference);

	return result;
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
