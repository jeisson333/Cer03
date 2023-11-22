const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'VENDEDOR',
		{
			id_vendedor: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},

			nombre_vendedor: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			numero_documento: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			//TipoDocumento UUID [ref: - CATALOGO_UNIVERSAL.id_catalogo]
			//VendedorSucursal UUID [ref: > SUCURSAL.id_sucursal]
		},
		{ freezeTableName: true, timestamps: false }
	);
};
