const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "DETALLES_VENTA",
    {
      id_detalles_venta: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      cantidad_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      //DetallesVenta UUID [ref: > VENTA.id_venta]
      //VentaProducto varchar [ref: > PRODUCTO.id_producto]
    },
    {
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
      deleteAt: "detroyTime",
    }
  );
};
