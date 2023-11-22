const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'INVENTARIO_PRODUCTO',
		{
			id_cantidad_producto: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},

			valor_inventario: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},

			//InventarioProducto UUID [ref: > PRODUCTO.id_producto]
			//  InventarioSucursal UUID [ref: > SUCURSAL.id_sucursal]
		},
		{ freezeTableName: true, timestamps: false }
	);
};
