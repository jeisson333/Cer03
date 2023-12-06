const {
  VENTA,
  DETALLES_VENTA,
  SUCURSAL,
  CATALOGO_UNIVERSAL,
  PRODUCTO,
  INVENTARIO_PRODUCTO,
} = require("../database/db");
const { handlerFilters, handlerApiFormat } = require("./controllerPages");
const { Op, Sequelize } = require("sequelize");

const getVentas = async ({ conditions, idBranch }) => {
  if (!idBranch?.id) throw new Error("The query need Product's branch");
  const [pageNumber, limit, offset] = handlerFilters({
    conditions,
  });

  const allsalesPromise = DETALLES_VENTA.findAll({
    attributes: [],
    include: [
      {
        attributes: ["id_venta"],
        model: VENTA,
        include: [
          {
            model: CATALOGO_UNIVERSAL,
            attributes: ["id_catalogo", "nombre_catalogo"],
            where: {
              nombre_catalogo: {
                [Op.iLike]: conditions?.pay ? `%${conditions?.pay}%` : "%%",
              },
            },
          },
          {
            model: SUCURSAL,
            attributes: ["id_sucursal", "nombre_sucursal"],
            where: {
              sucursal_empresa: idBranch?.id,
              nombre_sucursal: {
                [Op.iLike]: conditions?.sucursal
                  ? `%${conditions?.sucursal}%`
                  : "%%",
              },
            },
          },
        ],
        required: true,
      },
      {
        model: PRODUCTO,
        attributes: [
          [
            Sequelize.fn("ARRAY_AGG", Sequelize.col("nombre_producto")),
            "nombres",
          ],
        ],
        required: true,
        duplicating: false,
      },
    ],
    group: ["detalles_venta", "id_venta", "id_catalogo", "id_sucursal"],
    raw: true,
  });

  const salesPromise = DETALLES_VENTA.findAll({
    attributes: [],
    include: [
      {
        attributes: ["id_venta", "createdAt"],
        model: VENTA,
        include: [
          {
            model: CATALOGO_UNIVERSAL,
            attributes: ["id_catalogo", "nombre_catalogo"],
            where: {
              nombre_catalogo: {
                [Op.iLike]: conditions?.pay ? `%${conditions?.pay}%` : "%%",
              },
            },
          },
          {
            model: SUCURSAL,
            attributes: ["id_sucursal", "nombre_sucursal"],
            where: {
              sucursal_empresa: idBranch?.id,
              nombre_sucursal: {
                [Op.iLike]: conditions?.sucursal
                  ? `%${conditions?.sucursal}%`
                  : "%%",
              },
            },
          },
        ],
        required: true,
      },
      {
        model: PRODUCTO,
        attributes: [
          [
            Sequelize.fn("ARRAY_AGG", Sequelize.col("nombre_producto")),
            "nombres",
          ],
        ],
        required: true,
        duplicating: false,
      },
    ],
    order: [
      [
        VENTA,
        conditions?.orderName ? `${conditions?.orderName}` : `id_venta`,
        conditions?.order ? `${conditions?.order}` : `ASC`,
      ],
    ],
    group: ["detalles_venta", "id_venta", "id_catalogo", "id_sucursal"],
    raw: true,
    limit: limit,
    offset: offset,
  });

  const [sales, allSales] = await Promise.all([salesPromise, allsalesPromise]);

  const count = allSales.length;
  return handlerApiFormat(sales, pageNumber, count, limit);
};

const postVenta = async ({ body }) => {
  const venta = await VENTA.create({
    metodo_pago: body.payment,
    venta_sucursal: body.sucursal,
  });

  venta.setSUCURSAL(body.sucursal);
  venta.setCATALOGO_UNIVERSAL(body.payment);

  body?.products.forEach(async (product) => {
    if (product.stock) {
      let detalleVenta = await DETALLES_VENTA.create({
        cantidad_producto: product.amount,
        venta_producto: product.id_producto,
        detalles_venta: venta.id_venta,
      });

      detalleVenta.setPRODUCTO(product.id);
      detalleVenta.setVENTum(venta.id_venta);

      const invProd = await INVENTARIO_PRODUCTO.findOne({
        where: {
          inventario_sucursal: body.sucursal,
          inventario_producto: product.id,
        },
      });

      invProd.set({
        stock: product.totalStock,
      });

      await invProd.save();
    }
  });

  return venta;
};

module.exports = {
  getVentas,
  postVenta,
};
