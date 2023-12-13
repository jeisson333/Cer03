const {
  SUCURSAL,
  VENTA,
  DETALLES_VENTA,
  PRODUCTO,
  VENDEDOR,
} = require("../database/db");
const { Sequelize } = require("sequelize");

const getGananciaSucursalesController = async ({ branch, conditions }) => {
  const sucursales = await SUCURSAL.findAll({
    attributes: ["id_sucursal", "nombre_sucursal"],
    where: {
      sucursal_empresa: branch,
    },
  });

  const ventas = await DETALLES_VENTA.findAll({
    attributes: [
      [
        Sequelize.fn(
          "SUM",
          Sequelize.literal(
            `("DETALLES_VENTA"."cantidad_producto" * "PRODUCTO"."valor_venta")`
          )
        ),
        "totalResult",
      ],
      [Sequelize.literal(`("VENTum"."venta_sucursal")`), "id_sucursal"],
    ],
    include: [
      {
        model: PRODUCTO,
        attributes: [],
        required: true,
      },
      {
        model: VENTA,
        attributes: [],
        include: [
          {
            model: SUCURSAL,
            attributes: [],
            where: {
              sucursal_empresa: branch,
            },
          },
        ],
        required: true,
      },
    ],
    group: ["venta_sucursal"],
  });

  if (sucursales && ventas) {
    const object = {};
    const response = [];

    sucursales.forEach((sucursal) => {
      object[sucursal.id_sucursal] = {
        nombre: sucursal.nombre_sucursal,
        total: 0,
      };
    });
    ventas.forEach((venta) => {
      object[venta.dataValues.id_sucursal].total +=
        venta.dataValues.totalResult;
    });

    for (let key in object) {
      response.push({ name: object[key].nombre, total: object[key].total });
    }

    return response;
  }

  return [];
};

const getCantidadVendedoresController = async ({ branch }) => {
  const cantidad = await SUCURSAL.findAll({
    attributes: [
      "id_sucursal",
      "nombre_sucursal",
      [Sequelize.fn("COUNT", Sequelize.literal(`id_vendedor`)), "count"],
    ],
    where: {
      sucursal_empresa: branch,
    },
    include: [
      // {
      //   model: SUCURSAL,
      //   attributes: ["nombre_sucursal"],
      //   where: {
      //     sucursal_empresa: branch,
      //   },
      // },
      {
        model: VENDEDOR,
        attributes: [],
      },
    ],
    group: ["id_sucursal", "nombre_sucursal"],
  });

  return cantidad;
};

module.exports = {
  getGananciaSucursalesController,
  getCantidadVendedoresController,
};
