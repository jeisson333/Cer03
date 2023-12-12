const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "REVIEW",
    {
      id_review: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      titulo_review: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      descripcion_review: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      score_review: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
      deleteAt: "detroyTime",
    }
  );
};
