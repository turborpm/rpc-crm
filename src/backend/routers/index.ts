import { prisma } from "@/backend/utils/prisma";
import { getPokemonVotesByUser } from "@/utils/getPokemonVotesByUser";
import * as trpc from "@trpc/server";
import { z } from "zod";

export const appRouter = trpc
  .router()
  .query("get-pokemon-by-id", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      const pokemon = await prisma.pokemon.findFirst({
        where: { id: input.id },
      });
      if (!pokemon) throw new Error("Failed to find pokemon");

      return pokemon;
    },
  })
  .query("get-pokemon-votes-by-user", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ input }) {
      const pokemons = getPokemonVotesByUser(input.userId);

      if (!pokemons) throw new Error("Failed to find pokemons");

      return pokemons;
    },
  })
  .mutation("cast-vote", {
    input: z.object({
      votedFor: z.number(),
      votedAgainst: z.number(),
      userId: z.string().optional(),
    }),
    async resolve({ input }) {
      const voteInDb = await prisma.vote.create({
        data: {
          userId: input.userId,
          votedAgainstId: input.votedAgainst,
          votedForId: input.votedFor,
        },
      });
      return { success: true, vote: voteInDb };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
