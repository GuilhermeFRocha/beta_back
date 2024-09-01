import { FastifyInstance, FastifyRequest } from "fastify";
import User from "../models/user";

interface UserBody {
  username: string;
  password: string;
  email: string;
  role: string;
}

async function userRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/users",
    async (request: FastifyRequest<{ Body: UserBody }>, reply) => {
      const { username, password, email, role } = request.body;
      try {
        const newUser = await User.create({ username, password, email, role });
        return reply.status(201).send(newUser);
      } catch (error) {
        return reply.status(500).send({ error: "Error creating user" });
      }
    }
  );

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
