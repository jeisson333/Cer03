const {
  getMercadoPagoController,
  getSuccessController,
  getFailureController,
  getPendingController,
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
const getSuccess = async (req, res) => {
  try {
    const response = await getSuccessController();
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
const getFailure = async (req, res) => {
  try {
    const response = await getFailureController();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getPending = async (req, res) => {
  try {
    const response = await getPendingController();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPaymentGateways,
  getSuccess,
  getFailure,
  getPending,
  getWebHook,
};
