"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("dotenv").config();
const pg_1 = __importDefault(require("pg"));
const isProduction = process.env.NODE_ENV === "production";
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE || process.env.POSTGRES_DATABASE || "verceldb", process.env.USER || process.env.POSTGRES_USER || "default", process.env.PASSWORD || process.env.POSTGRES_PASSWORD, {
    host: process.env.HOST || process.env.POSTGRES_HOST,
    dialect: "postgres",
    dialectModule: pg_1.default,
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
