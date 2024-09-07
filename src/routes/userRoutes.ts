import { FastifyInstance, FastifyRequest } from "fastify";
import User from "../models/user";

interface UserBody {
  password: string;
  email: string;
  role: string;
}

async function userRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/users",
    async (request: FastifyRequest<{ Body: UserBody }>, reply) => {
      const { password, email, role } = request.body;

      console.log(password, email, role);
      
      try {
        const newUser = await User.create({ password, email, role });
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
