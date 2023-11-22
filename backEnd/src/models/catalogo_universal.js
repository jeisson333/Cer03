const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'CATALOGO_UNIVERSAL',
		{
			id_catalogo: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},

			nombre_catalogo: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			// TipoCatalogo UUID [ref: - CATALOGO_UNIVERSAL.id_catalogo]
		},
		{ freezeTableName: true, timestamps: false }
	);
};
