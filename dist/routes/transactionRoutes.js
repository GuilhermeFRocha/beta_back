"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transactionController_1 = require("../controllers/transactionController");
async function transactionRoutes(fastify) {
    fastify.post("/transaction/:id", transactionController_1.createTransactionHandler);
    fastify.get("/transaction/:id", transactionController_1.getTransactionsHandler);
    fastify.put("/transaction/:id", transactionController_1.updateTransactionHandler);
    fastify.delete("/transaction/:id", transactionController_1.deleteTransactionHandler);
}
exports.default = transactionRoutes;
