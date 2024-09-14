import { FastifyInstance } from "fastify";
import { loginUserHandler } from "../controllers/loginController";

async function loginRoutes(fastify: FastifyInstance) {
  fastify.post("/login", loginUserHandler);
}

export default loginRoutes;
