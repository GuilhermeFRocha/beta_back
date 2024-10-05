import { FastifyRequest, FastifyReply } from "fastify";
import Transaction from "../models/transaction";

interface RequestProps {
  id?: number;
  description: string;
  amount: number;
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

export async function updateTransactionHandler(
  request: FastifyRequest<{ Body: RequestProps }>,
  reply: FastifyReply
) {
  try {
    const { id, type, amount, description, category } = request.body; // O campo a ser atualizado

    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return reply.status(404).send({ error: "Transaction not found" });
    }

    await transaction.update({
      type,
      amount,
      description,
      category,
    });

    // Retornar a resposta de sucesso
    return reply.status(200).send(transaction);
  } catch (error) {
    reply.status(500).send({ error: "Error update transaction" });
  }
}

export async function deleteTransactionHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = request.params as { id: number }; // Extraindo o userId da rota

    const transaction = await Transaction.destroy({
      where: { id },
    });

    if (!transaction) {
      return reply.status(404).send({ error: "Transaction not found" });
    }

    return reply.send({ message: "Transaction deleted successfully" });
  } catch (error) {
    reply.status(500).send({ error: "Error deleting transaction" });
  }
}
