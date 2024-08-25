import { FastifyInstance } from "fastify";
import User from "../models/user";

async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/users", async (request, reply) => {
    const { username, password, email } = request.body as {
      username: string;
      password: string;
      email: string;
    };

    try {
      const newUser = await User.create({ username, password, email });
      return reply.status(201).send(newUser);
    } catch (error) {
      return reply.status(500).send({ error: "Error creating user" });
    }
  });

  fastify.get("/users", async (request, reply) => {
    try {
      const users = await User.findAll();
      return reply.send(users);
    } catch (error) {
      return reply.status(500).send({ error: "Error fetching users" });
    }
  });
}

export default userRoutes;
