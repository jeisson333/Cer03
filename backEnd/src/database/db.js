require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const {
  handlerSequealizeModels,
  handlerAssociationModels,
} = require("./association.js");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_ONLINE_URL, DB_MODE } =
  process.env;

let sequelize;

switch (DB_MODE) {
  case "online":
    sequelize = new Sequelize(DB_ONLINE_URL);
    break;
  case "local":
    sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      dialect: "postgres",
      logging: false,
      native: false,
    });
    break;
}

handlerSequealizeModels({ sequelize });
handlerAssociationModels({ sequelize });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
