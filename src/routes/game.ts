import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function GameRoutes(fastify: FastifyInstance) {
  fastify.get("/polls/:pollId/games", async (request) => {
    const getPoolParams = z.object({
      pollId: z.string(),
    });

    const { pollId } = getPoolParams.parse(request.params);

    const games = await prisma.game.findMany({
      orderBy: {
        date: "desc",
      },
      include: {
        guesses: {
          where: {
            participant: {
              userId: request.user.sub,
              pollId: pollId,
            },
          },
        },
      },
    });

    return {
      games: games.map((game) => {
        return {
          ...game,
          guess: game.guesses.length > 0 ? game.guesses[0] : null,
          guesses: undefined,
        };
      }),
    };
  });
}
