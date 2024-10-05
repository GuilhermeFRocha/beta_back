import { FastifyInstance } from "fastify";
import {
  createTransactionHandler,
  deleteTransactionHandler,
  getTransactionsHandler,
  updateTransactionHandler,
} from "../controllers/transactionController";

async function transactionRoutes(fastify: FastifyInstance) {
  fastify.post("/transaction/:id", createTransactionHandler);
  fastify.get("/transaction/:id", getTransactionsHandler);
  fastify.put("/transaction", updateTransactionHandler);
  fastify.delete("/transaction/:id", deleteTransactionHandler);
}

export default transactionRoutes;
