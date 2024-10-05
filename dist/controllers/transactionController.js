"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransactionHandler = createTransactionHandler;
exports.getTransactionsHandler = getTransactionsHandler;
exports.updateTransactionHandler = updateTransactionHandler;
exports.deleteTransactionHandler = deleteTransactionHandler;
const transaction_1 = __importDefault(require("../models/transaction"));
async function createTransactionHandler(request, reply) {
    try {
        const { id } = request.params; // Extraindo o userId da rota
        const { type, amount, category, date, description } = request.body;
        const transaction = await transaction_1.default.create({
            user_id: id,
            type,
            amount,
            category,
            date,
            description,
        });
        return reply.status(201).send(transaction);
    }
    catch (error) {
        reply.status(500).send({ error: "Error creating transaction" });
    }
}
async function getTransactionsHandler(request, reply) {
    try {
        const { id } = request.params; // Extraindo o userId da rota
        // Buscando as transações pelo userId
        const transactions = await transaction_1.default.findAll({ where: { user_id: id } });
        if (!transactions) {
            return reply
                .status(404)
                .send({ message: "No transactions found for this user." });
        }
        return reply.send(transactions);
    }
    catch (error) {
        reply.status(500).send({ error: "Error fetching transactions" });
    }
}
async function updateTransactionHandler(request, reply) {
    try {
        const { id, type, amount, description, category } = request.body; // O campo a ser atualizado
        const transaction = await transaction_1.default.findByPk(id);
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
    }
    catch (error) {
        reply.status(500).send({ error: "Error update transaction" });
    }
}
async function deleteTransactionHandler(request, reply) {
    try {
        const { id } = request.params; // Extraindo o userId da rota
        const transaction = await transaction_1.default.destroy({
            where: { id },
        });
        if (!transaction) {
            return reply.status(404).send({ error: "Transaction not found" });
        }
        return reply.send({ message: "Transaction deleted successfully" });
    }
    catch (error) {
        reply.status(500).send({ error: "Error deleting transaction" });
    }
}
