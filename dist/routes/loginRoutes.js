"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loginController_1 = require("../controllers/loginController");
async function loginRoutes(fastify) {
    fastify.post("/login", loginController_1.loginUserHandler);
}
exports.default = loginRoutes;
