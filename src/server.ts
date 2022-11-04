import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import * as dotenv from "dotenv";

import { PoolRoutes } from "./routes/poll";
import { UserRoutes } from "./routes/user";
import { GuessRoutes } from "./routes/guess";
import { AuthRoutes } from "./routes/auth";
import { GameRoutes } from "./routes/game";

dotenv.config();

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(jwt, {
    secret: process.env.SECRET_ACCESS_TOKEN as string,
  });

  await fastify.register(AuthRoutes);
  await fastify.register(GameRoutes);
  await fastify.register(GuessRoutes);
  await fastify.register(PoolRoutes);
  await fastify.register(UserRoutes);

  await fastify.listen({ port: 3333, host: "0.0.0.0" });
}

bootstrap();
