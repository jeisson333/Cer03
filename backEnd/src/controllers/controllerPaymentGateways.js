const mercadopage = require("mercadopago");

const getMercadoPagoController = async ({ info }) => {
  const { subscription, totalPay, currency, quantity } = info;
  const TOKEN = process.env.MERCADO_PAGO_TOKEN;
  mercadopage.configure({
    access_token: TOKEN,
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
      success: "http://localhost:5173/subscription/success",
      failure: "http://localhost:5173/subscription/failure",
      pending: "http://localhost:5173/subscription/pending",
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

module.exports = {
  getMercadoPagoController,
  getWebHookController,
};
