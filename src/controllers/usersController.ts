import { FastifyRequest, FastifyReply } from "fastify";
import User from "../models/user";

export async function usersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const users = await User.findAll();

    if (!users) {
      return reply
        .status(404)
        .send({ message: "No users found for this user." });
    }

    return reply.send(users);
  } catch (error) {
    reply.status(500).send({ error: "Error fetching users" });
  }
}
