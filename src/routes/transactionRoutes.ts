import { FastifyInstance } from "fastify";
import {
  createTransactionHandler,
  getTransactionsHandler,
} from "../controllers/transactionController";

async function transactionRoutes(fastify: FastifyInstance) {
  fastify.post("/transaction/:id", createTransactionHandler);
  fastify.get("/transaction/:id", getTransactionsHandler);
}

export default transactionRoutes;
