const { Router } = require('express');
const {
	postSingUpDevelopersHandler,
	postSingInDevelopersHandler,
} = require('../handlers/handlersDevelopers');

routeDevelopers = Router();

routeDevelopers.post('/sign-up', postSingUpDevelopersHandler);

routeDevelopers.post('/sing-in', postSingInDevelopersHandler);

module.exports = routeDevelopers;
