import { prisma } from "@/backend/utils/prisma";

export const getPokemonVotesByUser = async (userId: string) =>
  await prisma.pokemon.findMany({
    orderBy: { VoteFor: { _count: "desc" } },
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
    where: {
      OR: [
        {
          VoteFor: {
            some: {
              userId: userId,
            },
          },
        },
        {
          VoteAgainst: {
            some: {
              userId: userId,
            },
          },
        },
      ],
    },
  });
