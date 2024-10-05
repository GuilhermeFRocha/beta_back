import { Sequelize } from "sequelize";
require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE || "verceldb",
  process.env.POSTGRES_USER || "default",
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
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
