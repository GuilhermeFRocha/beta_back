import { FastifyInstance } from "fastify";
import { usersHandler } from "../controllers/usersController";

async function usersRoutes(fastify: FastifyInstance) {
  fastify.get("/users", usersHandler);
}

export default usersRoutes;
