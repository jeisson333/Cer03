const mercadopage = require("mercadopago");

const getMercadoPagoController = async ({ info }) => {
  const { subscription, totalPay, currency, quantity } = info;

  mercadopage.configure({
    access_token:
      "TEST-693675017837230-112918-1c7c986c9825a403771a0581260d31c1-1570236693",
  });

  const result = await mercadopage.preferences.create({
    items: [
      {
        title: subscription,
        unit_price: parseInt(totalPay),
        currency_id: currency,
        quantity: parseInt(quantity),
      },
    ],
    auto_return: "approved",
    back_urls: {
      success: "http://localhost:3001/paymentGateways/success",
      failure: "http://localhost:3001/paymentGateways/failure",
      pending: "http://localhost:3001/paymentGateways/pending",
    },
    notification_url:
      "https://5942-45-238-182-200.ngrok.io/paymentGateways/webhook",
  });

  return result.body;
};
const getWebHookController = async (infoQuery) => {
  if (infoQuery.type === "payment") {
    const data = await mercadopage.payment.findById(infoQuery["data.id"]);
    console.log(data);
  }
  return data;
};
const getSuccessController = async () => {
  return "Success";
};
const getFailureController = async () => {
  return "Failure";
};
const getPendingController = async () => {
  return "Pending";
};

module.exports = {
  getMercadoPagoController,
  getSuccessController,
  getFailureController,
  getPendingController,
  getWebHookController,
};
