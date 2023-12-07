const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "VENDEDOR",
    {
      id_vendedor: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      usuario_vendedor: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      contraseña_vendedor: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      primer_nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      segundo_nombre: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      primer_apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      segundo_apellido: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      numero_documento: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
      },

      //TipoDocumento UUID [ref: - CATALOGO_UNIVERSAL.id_catalogo]
      //VendedorSucursal UUID [ref: > SUCURSAL.id_sucursal]
    },
    {
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
      deleteAt: "detroyTime",
    }
  );
};
