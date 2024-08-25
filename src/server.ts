import Fastify from "fastify";
const sequelize = require("./config/database");
import userRoutes from "./routes/userRoutes";

const fastify = Fastify({
  logger: true,
});

fastify.register(userRoutes);

const start = async () => {
  try {
    await sequelize.sync();
    await fastify.listen({ port: 3000 });
    console.log("Server running on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
