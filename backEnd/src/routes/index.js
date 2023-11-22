const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routeEmpresa = require("./routeEmpresa.js");
const routeVentas = require("./routeVentas.js");
const routeVendedor = require("./routeVendedor.js");
const routeProductos = require("./routeProductos.js");

const router = Router();

// Configurar los routers
router.use("/empresa", routeEmpresa);
router.use("/vendedor", routeVendedor);
router.use("/ventas", routeVentas);
router.use("/productos", routeProductos);

module.exports = router;
