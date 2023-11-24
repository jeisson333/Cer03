const { VENDEDOR, CATALOGO_UNIVERSAL, SUCURSAL } = require('../database/db');
const { Op } = require('sequelize');

const getVendedorIdentityCard = async (identityCard) => {
	let salesman = await VENDEDOR.findOne({
		where: {
			numero_documento: identityCard,
		},
		include: [
			{
				model: SUCURSAL,
			},
			{
				model: CATALOGO_UNIVERSAL,
			},
		],
	});
	return salesman;
};

const getVendedorByName = async (name) => {
	let salesmen = await VENDEDOR.findAll({
		where: {
			primer_nombre: {
				[Op.like]: `%${name}%`, // Busca coincidencias parciales en el nombre
			},
		},
		include: [
			{
				model: SUCURSAL,
			},
			{
				model: CATALOGO_UNIVERSAL,
			},
		],
	});

	return salesmen;
};

module.exports = {
	getVendedorIdentityCard,
	getVendedorByName,
};
