const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'PRODUCTO',
		{
			id_producto: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},

			Nombre_producto: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			valor_venta: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},

			valor_compra: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			// TipoProducto varchar [ref: - CATALOGO_UNIVERSAL.id_catalogo]
			//ProductoEmpresa UUID [ref: > EMPRESA.id_empresa]
		},
		{ freezeTableName: true, timestamps: false }
	);
};
