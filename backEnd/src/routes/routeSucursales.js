const { Router } = require('express');

const {
	getByNameSucursalHandler,
	getSucursalesByNameEmpresaHandler,
} = require('../handlers/handlerSucursales.js');

routeSucursales = Router();

routeSucursales.get('/nameSucursal', getByNameSucursalHandler);
routeSucursales.get('/nameEmpresa', getSucursalesByNameEmpresaHandler);

module.exports = routeSucursales;
