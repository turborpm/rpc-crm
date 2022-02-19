import { getPokemonVotesByUser } from "@/utils/getPokemonVotesByUser";
import { trpc } from "@/utils/trpc";
import { AsyncReturnType } from "@/utils/ts-bs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

type PokemonQueryResult = AsyncReturnType<typeof getPokemonVotesByUser>;

const generateCountPercent = (pokemon: PokemonQueryResult[number]) => {
  const { VoteFor, VoteAgainst } = pokemon._count;
  if (VoteFor + VoteAgainst === 0) return 0;
  return ((VoteFor / (VoteFor + VoteAgainst)) * 100).toFixed(2);
};

const PokemonListing: React.FC<{
  pokemon: PokemonQueryResult[number];
}> = ({ pokemon }) => {
  return (
    <div className="flex border-b p-2 items-center justify-between">
      <div className="flex items-center">
        <Image src={pokemon.spriteUrl} layout="fixed" width={64} height={64} />
        <div className="capitalze">{pokemon.name}</div>
      </div>
      <div className="pr-1">{generateCountPercent(pokemon)}%</div>
    </div>
  );
};

const ResultsPage: React.FC<{}> = () => {
  const { data: session } = useSession();

  if (!session) return <img src="/grid.svg" />;

  const { data: pokemons } = trpc.useQuery([
    "get-pokemon-votes-by-user",
    { userId: session.userId },
  ]);

  return !pokemons ? (
    <img src="/grid.svg" />
  ) : (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl capitalize">{session.user?.name}'s results</h2>
      <div className="p-2" />
      <div className="flex flex-col w-full max-w-2xl border">
        {pokemons.map((currentPokemon, index) => (
          <PokemonListing pokemon={currentPokemon} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
