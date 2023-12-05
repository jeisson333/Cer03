const mercadopage = require("mercadopago");
const { PAGO_TOKEN } = process.env;

const getMercadoPagoController = async ({ info }) => {
  const { subscription, totalPay, currency, quantity } = info;

  mercadopage.configure({
    access_token: PAGO_TOKEN,
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
      "https://2940-45-238-182-161.ngrok.io/paymentGateways/webhook",
  });

  return result.body;
};
const getWebHookController = async (infoQuery) => {
  try {
    if (infoQuery.type === "payment") {
      const data = await mercadopage.payment.findById(infoQuery["data.id"]);
      console.log(data);
    } else {
      throw Error("Error");
    }
    return data;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

module.exports = {
  getMercadoPagoController,
  getWebHookController,
};
