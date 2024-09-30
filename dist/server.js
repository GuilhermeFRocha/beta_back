"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const sequelize = require("./config/database");
const registerRoutes_1 = __importDefault(require("./routes/registerRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const cors_1 = __importDefault(require("@fastify/cors"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const fastify = (0, fastify_1.default)({
    logger: {
        level: "error",
    },
});
fastify.register(cors_1.default, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
});
fastify.register(registerRoutes_1.default);
fastify.register(loginRoutes_1.default);
fastify.register(transactionRoutes_1.default);
fastify.register(usersRoutes_1.default);
const start = async () => {
    try {
        // await sequelize.sync({ alter: true });
        await fastify.listen({ port: 8000 });
        console.log("Server running on http://localhost:8000");
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
