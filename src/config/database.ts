// import { Sequelize } from "sequelize";
// require("dotenv").config();
// import pg from "pg";
// const isProduction = process.env.NODE_ENV === "production";

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

import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize(
  process.env.DATABASE_URL ||
    "postgres://default:wKL26tCWMUOV@localhost:5432/verceldb",
  {
    dialect: "postgres",
    dialectModule: pg,
    logging: false,
    dialectOptions: isProduction
      ? {
          ssl: {
            require: true, // Requer SSL em produção
            rejectUnauthorized: false, // Necessário para evitar erros de SSL
          },
        }
      : {},
  }
);

// Testar a conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados foi bem-sucedida.");
  })
  .catch((err) => {
    console.error("Não foi possível conectar ao banco de dados:", err);
  });

export default sequelize;
