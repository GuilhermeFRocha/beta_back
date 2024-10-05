import { Sequelize } from "sequelize";
require("dotenv").config();
import pg from "pg";

const sequelize = new Sequelize(
  process.env.DATABASE ||
    "postgres://default:wKL26tCWMUOV@ep-spring-violet-a4m8pv2q-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require",
  process.env.USER || "default",
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "postgres",
    dialectModule: pg,
    logging: false,
    dialectOptions: {
      ssl: true,
    },
  }
);

module.exports = sequelize;
