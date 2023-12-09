const { SUCURSAL, EMPRESA } = require('../database/db');
const { Op } = require('sequelize');

const getSucursalByName = async (nameSucursal) => {
	let sucursalesFounds = await SUCURSAL.findAll({
		where: {
			nombre_sucursal: nameSucursal,
		},
		include: [
			{
				model: EMPRESA,
			},
		],
	});
	return sucursalesFounds;
};

const getSucursalesByEmpresa = async (nameEmpresa) => {
	let sucursalesEmpresa = await EMPRESA.findAll({
		where: {
			nombre_empresa: nameEmpresa,
		},
		include: {
			model: SUCURSAL,
			required: true,
		},
	});

	return sucursalesEmpresa;
};

module.exports = {
	getSucursalByName,
	getSucursalesByEmpresa,
};
