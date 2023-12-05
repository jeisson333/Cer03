const mercadopage = require("mercadopago");
const { PAGO_TOKEN, BASE_URL } = process.env;

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
      success: `${BASE_URL}/subscription/success`,
      failure: `${BASE_URL}/subscription/failure`,
      pending: `${BASE_URL}/subscription/pending`,
    },

    notification_url:
      "https://de86-45-238-182-161.ngrok.io/paymentGateways/webhook",
  });

  return result.body;
};
const getWebHookController = async (infoQuery) => {
  try {
    console.log("entra");
    if (infoQuery.type === "payment") {
      const data = await mercadopage.payment.findById(infoQuery["data.id"]);

      return data;
    } else {
      throw new Error("Not payment");
    }
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

module.exports = {
  getMercadoPagoController,
  getWebHookController,
};
