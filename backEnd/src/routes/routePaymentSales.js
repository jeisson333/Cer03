const { Router } = require('express');

const {
	getPaymentSales,
	getWebHook,
} = require('../handlers/handlerPaymentSales.js');

routePaymentSales = Router();

routePaymentSales.post('/', getPaymentSales);
routePaymentSales.post('/webhook', getWebHook);

routePaymentSales.post('/success', success);
routePaymentSales.post('/failure', failure);
routePaymentSales.post('/pending', pending);

module.exports = {
	routePaymentSales,
};
