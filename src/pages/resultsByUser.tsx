import { getPokemonVotesByUser } from "@/utils/getPokemonVotesByUser";
import { trpc } from "@/utils/trpc";
import { AsyncReturnType } from "@/utils/ts-bs";
import { useSession } from "next-auth/react";
import Head from "next/head";
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
        <Image
          src={pokemon.spriteUrl}
          layout="fixed"
          width={64}
          height={64}
          alt={pokemon.name}
        />
        <div className="capitalze">{pokemon.name}</div>
      </div>
      <div className="pr-1">{generateCountPercent(pokemon)}%</div>
    </div>
  );
};

const ResultsPage: React.FC<{}> = () => {
  const { data: session } = trpc.useQuery(["next-auth.getSession"]);

  const { data: pokemons, error } = trpc.useQuery([
    "get-pokemon-votes-by-user",
  ]);
  if (error) alert(error);
  return (
    <>
      <Head>
        <title>{session?.user?.name}&apos;s results</title>
      </Head>
      <div className="h-screen w-screen flex flex-col justify-between align-middle items-center">
        <h2 className="text-2xl capitalize">
          {(session && session?.user?.name) || "User"}&apos;s results
        </h2>
        {!pokemons || !session ? (
          <img src="/grid.svg" className="my-auto" />
        ) : (
          <>
            <div className="p-2" />
            <div className="flex flex-col w-full max-w-2xl border">
              {pokemons.map((currentPokemon, index) => (
                <PokemonListing pokemon={currentPokemon} key={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ResultsPage;
