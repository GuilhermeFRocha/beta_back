"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserHandler = loginUserHandler;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
async function loginUserHandler(request, reply) {
    const { email, password } = request.body;
    try {
        const user = await user_1.default.findOne({ where: { email } });
        if (!user) {
            return reply.status(401).send({ error: "Invalid credentials" });
        }
        const userDate = user.dataValues;
        const isPasswordValid = await bcrypt_1.default.compare(password, userDate.password);
        if (!isPasswordValid) {
            return reply.status(401).send({ error: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: userDate.id, email: userDate.email, role: userDate.role }, "your-secret-key", { expiresIn: "1h" });
        return reply.send({ token });
    }
    catch (error) {
        return reply.status(500).send({ error: "Internal server error" });
    }
}
