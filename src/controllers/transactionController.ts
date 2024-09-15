import { FastifyRequest, FastifyReply } from "fastify";
import Transaction from "../models/transaction";

export async function createTransactionHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const transaction = await Transaction.findOne();
}

export async function getTransactionsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = request.params as { id: string }; // Extraindo o userId da rota

    // Buscando as transações pelo userId
    const transactions = await Transaction.findAll({ where: { user_id: id } });

    if (!transactions) {
      return reply
        .status(404)
        .send({ message: "No transactions found for this user." });
    }

    return reply.send(transactions);
  } catch (error) {
    reply.status(500).send({ error: "Error fetching transactions" });
  }
}
