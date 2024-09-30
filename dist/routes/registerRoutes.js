"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerController_1 = require("../controllers/registerController");
async function registerRoutes(fastify) {
    fastify.post("/register", registerController_1.createRegisterHandler);
}
exports.default = registerRoutes;
