import PokemonListing from "@/components/pokemonRow";
import { getPokemonVotesByUser } from "@/utils/getPokemonVotesByUser";
import { trpc } from "@/utils/trpc";
import { AsyncReturnType } from "@/utils/ts-bs";
import Head from "next/head";
import React from "react";

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
      <div className="h-screen w-screen flex flex-col justify-between align-middle items-center overflow-auto">
        <h2 className="text-2xl capitalize sticky top-0">
          {(session && session?.user?.name) || "User"}&apos;s results
        </h2>
        {!pokemons || !session ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/grid.svg" className="my-auto invert" alt="loading" />
        ) : (
          <>
            <div className="p-2" />
            <div className="flex flex-col w-full max-w-2xl shadow-2xl border border-black">
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
