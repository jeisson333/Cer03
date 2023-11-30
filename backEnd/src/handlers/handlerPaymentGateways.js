const {
  getMercadoPagoController,
  getWebHookController,
} = require("../controllers/controllerPaymentGateways.js");

const getPaymentGateways = async (req, res) => {
  try {
    const info = req.query;
    const response = await getMercadoPagoController({ info });
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
  getPaymentGateways,
  getWebHook,
};
