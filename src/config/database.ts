import { Sequelize } from "sequelize";
require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize(
  process.env.DATABASE || "verceldb",
  process.env.USER || "default",
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "postgres",
    logging: false,
    dialectOptions: isProduction
      ? {
          ssl: {
            require: true, // Neon requer SSL em produção
            rejectUnauthorized: false, // Necessário para evitar erros de SSL
          },
        }
      : {},
  }
);

module.exports = sequelize;
