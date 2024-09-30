"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRegisterHandler = createRegisterHandler;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
async function createRegisterHandler(request, reply) {
    const { password, email, role } = request.body;
    try {
        if (!password || !email) {
            return reply.status(400).send({ error: "Missing parameters" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await user_1.default.create({
            password: hashedPassword,
            email,
            role,
        });
        const userDate = newUser.dataValues;
        const token = jsonwebtoken_1.default.sign({ id: userDate.id, email: userDate.email, role: userDate.role }, process.env.JWT_SECRET_KEY || "your-secret-key", { expiresIn: "1h" });
        return reply.status(201).send({ token });
    }
    catch (error) {
        return reply.status(500).send({ error: "Already registered user" });
    }
}
