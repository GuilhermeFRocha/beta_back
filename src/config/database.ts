import { Sequelize } from "sequelize";

const sequelize = new Sequelize("postgres", "postgres", "Guibru20", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
