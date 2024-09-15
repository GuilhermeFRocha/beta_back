import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

interface UserBody {
  password: string;
  email: string;
  role: string;
}

export async function createRegisterHandler(
  request: FastifyRequest<{ Body: UserBody }>,
  reply: FastifyReply
) {
  const { password, email, role } = request.body;

  try {
    if (!password || !email) {
      return reply.status(400).send({ error: "Missing parameters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      password: hashedPassword,
      email,
      role,
    });

    const userDate = newUser.dataValues;

    const token = jwt.sign(
      { id: userDate.id, email: userDate.email, role: userDate.role },
      process.env.JWT_SECRET_KEY || "your-secret-key",
      { expiresIn: "1h" }
    );

    return reply.status(201).send({ token });
  } catch (error) {
    return reply.status(500).send({ error: "Already registered user" });
  }
}
