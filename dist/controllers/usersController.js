"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersHandler = usersHandler;
const user_1 = __importDefault(require("../models/user"));
async function usersHandler(request, reply) {
    try {
        const users = await user_1.default.findAll();
        if (!users) {
            return reply
                .status(404)
                .send({ message: "No users found for this user." });
        }
        return reply.send(users);
    }
    catch (error) {
        reply.status(500).send({ error: "Error fetching users" });
    }
}
