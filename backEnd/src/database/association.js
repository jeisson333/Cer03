const fs = require("fs");
const path = require("path");

const handlerSequealizeModels = ({ sequelize }) => {
  const basename = path.basename(__filename);

  const modelDefiners = [];

  fs.readdirSync(path.join(__dirname, "../models"))
    .filter(
      (file) =>
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
    .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, "../models", file)));
    });

  modelDefiners.forEach((model) => model(sequelize));

  let entries = Object.entries(sequelize.models);
  let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
  ]);
  sequelize.models = Object.fromEntries(capsEntries);
};

const handlerAssociationModels = ({ sequelize }) => {
  const {
    CATALOGO_UNIVERSAL,
    CONTACTO_EMPRESA,
    DETALLES_VENTA,
    EMPRESA,
    INVENTARIO_PRODUCTO,
    PRODUCTO,
    SUCURSAL,
    VENDEDOR,
    VENTA,
  } = sequelize.models;

  CATALOGO_UNIVERSAL.hasOne(CATALOGO_UNIVERSAL, {
    foreignKey: {
      name: "TipoCatalogo",
    },
  });
};

module.exports = {
  handlerSequealizeModels,
  handlerAssociationModels,
};
