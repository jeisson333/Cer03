const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'CONTACTO_EMPRESA',
		{
			id_contacto_empresa: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},

			contacto: {
				type: DataTypes.STRING,
				allowNull: false,
			},

			//ContactoEmpresa UUID [ref: > EMPRESA.id_empresa]
			// TipoContacto UUID [ref: - CATALOGO_UNIVERSAL.id_catalogo]
		},
		{ freezeTableName: true, timestamps: false }
	);
};
