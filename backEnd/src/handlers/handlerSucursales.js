const {
	getSucursalByName,
	getSucursalesByEmpresa,
} = require('../controllers/controllerSucursales.js');

const getByNameSucursalHandler = async (req, res) => {
	try {
		const { nameSucursal } = req.query;

		if (!nameSucursal)
			return res.status(400).send('unregistered branch office');

		const response = await getSucursalByName(nameSucursal);

		if (!response.length)
			return res.status(400).send(' branch office not found');

		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getSucursalesByNameEmpresaHandler = async (req, res) => {
	try {
		const { nameEmpresa } = req.query;

		if (!nameEmpresa) return res.status(400).send('Enter company name');

		const response = await getSucursalesByEmpresa(nameEmpresa);

		if (!Object.keys(response).length)
			return res.status(400).send('This company is not registered');

		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getByNameSucursalHandler,
	getSucursalesByNameEmpresaHandler,
};
