const {
	getVendedorIdentityCard,
	getVendedorByName,
} = require('../controllers/controllerVendedor.js');

const getVendedorHandlerIdentityCard = async (req, res) => {
	try {
		const { identityCard } = req.query;

		if (!identityCard) return res.status(400).send('Not found');

		const response = await getVendedorIdentityCard(identityCard);

		if (!Object.keys(response).length)
			return res.status(400).send('Salesman not found');

		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getVendedorHandlerName = async (req, res) => {
	try {
		const { name } = req.query;

		if (!name) return res.status(400).send('Not found');

		const response = await getVendedorByName(name);

		if (!Object.keys(response).length)
			return res.status(400).send('Salesmen not founds');

		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getVendedorHandlerIdentityCard,
	getVendedorHandlerName,
};
