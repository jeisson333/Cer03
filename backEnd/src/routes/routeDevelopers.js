const { Router } = require('express');
const {
	postSingUpDevelopersHandler,
	postSingInDevelopersHandler,
} = require('../handlers/handlersDevelopers');

routeDevelopers = Router();

routeDevelopers.post('/sing-up', postSingUpDevelopersHandler);

routeDevelopers.post('/sing-in', postSingInDevelopersHandler);

module.exports = routeDevelopers;
