const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routeRegistroEmpresa = require("./routeRegistroEmpresa.js");
const routeVentas = require("./routeVentas.js");
const routeProductos = require("./routeProductos.js");

const router = Router();

// Configurar los routers
router.use("/registro", routeRegistroEmpresa);
router.use("/ventas", routeVentas);
router.use("/productos", routeProductos);

module.exports = router;
