const { Sequelize } = require("sequelize");

module.exports = new Sequelize("PERN-stack-posting-system", "postgres", null, {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000,
  },
});
