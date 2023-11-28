const { EMPRESA } = require('../database/db');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const singIn = async (email, password) => {
	try {
		const empresa = await EMPRESA.findOne({
			where: {
				email: email,
				password: password,
			},
		});

		if (!empresa) return { msg: 'invalid email or password' };

		// volver la fecha en valor numero milisegundos
		/*const fechaMilisegundos = empresa.fecha_licencia.getTime();
		const fechaActual = new Date();

		if (fechaMilisegundos < fechaActual.getTime()) {
			return { msg: 'your license expired' };
        }*/
	} catch (error) {
		return error;
	}
	const token = jwt.sign(
		{
			email,
			password,
			exp: Date.now() + 60 * 5000,
		},
		SECRET
	);
	console.log(token);
	return token;
};

module.exports = {
	singIn,
};
/*var token = jwt.sign({ foo: 'bar' }, 'shhhhh');*/
