const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'VENTA',
		{
			id_venta: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},

			// MetodoDePago varchar [ref: - CATALOGO_UNIVERSAL.id_catalogo]
			//VentaSucursal UUID [ref: > SUCURSAL.id_sucursal]
		},
		{ freezeTableName: true, timestamps: false }
	);
};
