import Fastify from "fastify";
const sequelize = require("./config/database");
import registerRoutes from "./routes/registerRoutes";
import loginRoutes from "./routes/loginRoutes";
import cors from "@fastify/cors";

const fastify = Fastify({
  logger: {
    level: "error",
  },
});

fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

fastify.register(registerRoutes);
fastify.register(loginRoutes);

const start = async () => {
  try {
    await sequelize.sync({ alter: true });
    await fastify.listen({ port: 8000 });
    console.log("Server running on http://localhost:8000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
