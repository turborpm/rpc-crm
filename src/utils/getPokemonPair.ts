import { prisma } from "@/backend/utils/prisma";
import { AsyncReturnType } from "./ts-bs";

export type PokemonPairResult = AsyncReturnType<typeof getPokemonPair>;

export const getPokemonPair = async (first: number, second: number) =>
  await prisma.pokemon.findMany({
    where: { id: { in: [first, second] } },
    select: {
      id: true,
      name: true,
      spriteUrl: true,
      _count: {
        select: {
          VoteAgainst: true,
          VoteFor: true,
        },
      },
    },
  });
