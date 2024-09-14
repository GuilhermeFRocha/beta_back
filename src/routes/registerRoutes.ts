import { FastifyInstance } from "fastify";
import { createRegisterHandler } from "../controllers/registerController";

async function registerRoutes(fastify: FastifyInstance) {
  fastify.post("/register", createRegisterHandler);
}

export default registerRoutes;
