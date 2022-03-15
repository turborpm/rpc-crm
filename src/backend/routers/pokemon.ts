import { createRouter } from "@/backend/createRouter";
import { prisma } from "@/backend/utils/prisma";
import { getPokemonVotesByUser } from "@/utils/getPokemonVotesByUser";
import { z } from "zod";

export const router = createRouter()
  .query("get-pokemon-by-id", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input, ctx }) {
      const pokemon = await prisma.pokemon.findFirst({
        where: { id: input.id },
      });
      if (!pokemon) throw new Error("Failed to find pokemon");

      return pokemon;
    },
  })
  .query("get-pokemon-votes-by-user", {
    async resolve({ input, ctx }) {
      if (!ctx.session?.userId) throw new Error("Not logged in");
      const pokemons = getPokemonVotesByUser(ctx.session?.userId || "");

      if (!pokemons) throw new Error("Failed to find pokemons");

      return pokemons;
    },
  })
  .mutation("cast-vote", {
    input: z.object({
      votedFor: z.number(),
      votedAgainst: z.number(),
    }),
    async resolve({ input, ctx }) {
      const voteInDb = await prisma.vote.create({
        data: {
          userId: ctx.session?.userId,
          votedAgainstId: input.votedAgainst,
          votedForId: input.votedFor,
        },
      });
      return { success: true, vote: voteInDb };
    },
  });
