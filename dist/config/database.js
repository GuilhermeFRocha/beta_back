"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE || "verceldb", process.env.USER || "default", process.env.PASSWORD, {
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
});
module.exports = sequelize;
