"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("dotenv").config();
const isProduction = "production";
const sequelize = new sequelize_1.Sequelize("verceldb", "default", "wKL26tCWMUOV", {
    host: "ep-spring-violet-a4m8pv2q-pooler.us-east-1.aws.neon.tech",
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
