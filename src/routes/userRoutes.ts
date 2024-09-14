import { FastifyInstance, FastifyRequest } from "fastify";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

        const token = jwt.sign(
          { id: newUser.id, email: newUser.email, role: newUser.role },
          process.env.JWT_SECRET_KEY || "your-secret-key",
          { expiresIn: "1h" }
        );

        return reply.status(201).send({ token });
      } catch (error) {
        return reply.status(500).send({ error: "Already registered user" });
      }
    }
  );

  fastify.post(
    "/login",
    async (request: FastifyRequest<{ Body: UserBody }>, reply) => {
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
  );
}

export default userRoutes;
