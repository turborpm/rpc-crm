import { createRouter } from "@/backend/createRouter";
import { prisma } from "@/backend/utils/prisma";
import { getPokemonVotesByUser } from "@/utils/getPokemonVotesByUser";
import { getOptionsForVote } from "@/utils/getRandomPokemon";
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
  .query("get-pokemon-pair", {
    async resolve() {
      const [first, second] = getOptionsForVote();

      const bothPokemon = await prisma.pokemon.findMany({
        where: { id: { in: [first, second] } },
      });

      if (bothPokemon.length !== 2)
        throw new Error("Failed to find two pokemon");

      return { firstPokemon: bothPokemon[0], secondPokemon: bothPokemon[1] };
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
