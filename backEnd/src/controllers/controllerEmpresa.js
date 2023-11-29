const { EMPRESA } = require('../database/db');

const postEmpresa = async (nombre_empresa, email, password, fecha_licencia) => {
	const nuevaEmpresa = await EMPRESA.findOrCreate({
		where: {
			nombre_empresa: nombre_empresa,
			email: email,
			password: password,
			fecha_licencia: fecha_licencia,
		},
	});

	return nuevaEmpresa;
};

const getEmpresa = () => {};

module.exports = {
	getEmpresa,
	postEmpresa,
};
