const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routeAuth = require('./routeAuth.js');
const routeEmpresa = require('./routeEmpresa.js');
const routeVentas = require('./routeVentas.js');
//const routeVendedor = require('./routeVendedor.js');
const productsRouter = require('./productsRouter.js');
const routeSucursales = require('./routeSucursales.js');
const routeSaveJsonInDB = require('./saveJsonInDBRouter.js');
const routeCatalogos = require('./routeCatalogo.js');
const routePaymentGateways = require('./routePaymentGateways.js');
const routeSales = require('./routePaymentSales.js');

//const { verifyToken } = require('../middlewares/authJWT.js');

const router = Router();

// Configurar los routers
router.use('/auth', routeAuth);
router.use('/empresa', routeEmpresa);
//router.use("/vendedor", verifyToken, routeVendedor);
router.use('/ventas', routeVentas);
router.use('/products', productsRouter);
router.use('/sucursales', routeSucursales);
router.use('/database', routeSaveJsonInDB);
router.use('/catalogos', routeCatalogos);
router.use('/paymentGateways', routePaymentGateways);
router.use('/paymentSales', routeSales);

module.exports = router;
