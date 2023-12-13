const { DEVELOPER } = require('../database/db');
const { Op } = require('sequelize');
const JWT_DEVELOPERS = process.env.JWT_DEVELOPERS;
const jwt = require('jsonwebtoken');

const singUpDeveloper = async ({ email, password }) => {
	console.log(email, password, 'controllerrrrr');
	const create = await DEVELOPER.findOne({
		where: { email: email },
	});

	if (create) return 'este usuario ya existe';

	await DEVELOPER.create({
		email: email,
		password: password,
	});
	return 'usuario creado con exito!';
};

const singInDeveloper = async ({ email, password }) => {
	const found = DEVELOPER.findOne({
		where: {
			[Op.and]: [{ email: email }, { password: password }],
		},
	});

	if (found) {
		const token = jwt.sign(
			{
				role: 'developer',
				exp: Date.now() / 1000 + 60 * 1440,
			},
			JWT_DEVELOPERS
		);
		return token;
	}
};

module.exports = {
	singUpDeveloper,
	singInDeveloper,
};
