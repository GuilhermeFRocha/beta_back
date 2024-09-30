"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersController_1 = require("../controllers/usersController");
async function usersRoutes(fastify) {
    fastify.get("/users", usersController_1.usersHandler);
}
exports.default = usersRoutes;
