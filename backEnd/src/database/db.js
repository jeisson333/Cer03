require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const {
  handlerSequealizeModels,
  handlerAssociationModels,
} = require("./association.js");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
  native: false,
});

handlerSequealizeModels({ sequelize });
handlerAssociationModels({ sequelize });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
