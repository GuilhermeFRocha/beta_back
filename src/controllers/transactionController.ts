import { FastifyRequest, FastifyReply } from "fastify";
import Transaction from "../models/transaction";

interface RequestProps {
  description: string;
  amount: string;
  category: string;
  type: string;
  date: string;
}

export async function createTransactionHandler(
  request: FastifyRequest<{ Body: RequestProps }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params as { id: number }; // Extraindo o userId da rota
    const { type, amount, category, date, description } = request.body;

    const transaction = await Transaction.create({
      user_id: id,
      type,
      amount,
      category,
      date,
      description,
    });

    return reply.status(201).send(transaction);
  } catch (error) {
    reply.status(500).send({ error: "Error creating transaction" });
  }
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
