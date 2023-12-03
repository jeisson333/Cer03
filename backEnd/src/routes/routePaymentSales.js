const { Router } = require('express');

const {
	getPaymentSales,
	getWebHook,
} = require('../handlers/handlerPaymentSales.js');

routeSales = Router();

routeSales.post('/', getPaymentSales);
routeSales.post('/webhook', getWebHook);

/*routePaymentSales.post('/success', success);
routePaymentSales.post('/failure', failure);
routePaymentSales.post('/pending', pending);*/

module.exports = routeSales;
