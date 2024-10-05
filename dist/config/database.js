"use strict";
// import { Sequelize } from "sequelize";
// require("dotenv").config();
// import pg from "pg";
// const isProduction = process.env.NODE_ENV === "production";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const sequelize = new Sequelize(
//   process.env.DATABASE || "verceldb",
//   process.env.USER || "default",
//   process.env.PASSWORD,
//   {
//     host: process.env.HOST,
//     dialect: "postgres",
//     dialectModule: pg,
//     logging: false,
//     dialectOptions: isProduction
//       ? {
//           ssl: {
//             require: true, // Neon requer SSL em produção
//             rejectUnauthorized: false, // Necessário para evitar erros de SSL
//           },
//         }
//       : {},
//   }
// );
// module.exports = sequelize;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = __importDefault(require("pg"));
dotenv_1.default.config();
const isProduction = process.env.NODE_ENV === "production";
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL ||
    "postgres://default:wKL26tCWMUOV@localhost:5432/verceldb", {
    dialect: "postgres",
    dialectModule: pg_1.default,
    logging: false,
    dialectOptions: isProduction
        ? {
            ssl: {
                require: true, // Requer SSL em produção
                rejectUnauthorized: false, // Necessário para evitar erros de SSL
            },
        }
        : {},
});
// Testar a conexão com o banco de dados
sequelize
    .authenticate()
    .then(() => {
    console.log("Conexão com o banco de dados foi bem-sucedida.");
})
    .catch((err) => {
    console.error("Não foi possível conectar ao banco de dados:", err);
});
exports.default = sequelize;
