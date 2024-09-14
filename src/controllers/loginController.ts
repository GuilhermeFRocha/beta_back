import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

interface UserBody {
  password: string;
  email: string;
}

export async function loginUserHandler(
  request: FastifyRequest<{ Body: UserBody }>,
  reply: FastifyReply
) {
  const { email, password } = request.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return reply.status(401).send({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.dataValues.password
    );

    if (!isPasswordValid) {
      return reply.status(401).send({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      "your-secret-key",
      { expiresIn: "1h" }
    );

    return reply.send({ token });
  } catch (error) {
    return reply.status(500).send({ error: "Internal server error" });
  }
}
