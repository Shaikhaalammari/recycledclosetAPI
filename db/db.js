const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "shaikha19",
  database: "recycledCloset-db",
  dialect: "postgres",
  host: "localhost",
});

module.exports = db;
