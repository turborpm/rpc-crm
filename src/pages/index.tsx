import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { inferQueryResponse, trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const btn =
  "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

const Home: NextPage = () => {
  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

  const voteMutation = trpc.useMutation(["cast-vote"]);

  const voteForRoundest = (selected: number) => {
    if (selected === first)
      voteMutation.mutate({ votedFor: first, votedAgainst: second });
    else if (selected === second)
      voteMutation.mutate({ votedFor: second, votedAgainst: first });

    updateIds(getOptionsForVote());
  };

  const dataLoaded =
    !firstPokemon.isLoading &&
    firstPokemon.data &&
    !secondPokemon.isLoading &&
    secondPokemon.data;

  return (
    <div className="h-screen w-screen flex flex-col justify-between align-center items-center">
      <Head>
        <title>Roundest Pokemon</title>
      </Head>
      <div className="text-2xl text-center pt-8">Which Pokémon is Rounder?</div>
      {dataLoaded && (
        <div className="border rounded p-8 flex justify-between items-center max-w-2xl  md:flex-row animate-fade-in">
          <PokemonListing
            pokemon={firstPokemon.data}
            vote={() => voteForRoundest(first)}
          />
          <div className="p-8">Vs</div>
          <PokemonListing
            pokemon={secondPokemon.data}
            vote={() => voteForRoundest(second)}
          />
          <div className="p-2" />
        </div>
      )}
      {!dataLoaded && <img src="/grid.svg" />}
      <div className="w-full text-xl text-center pb-2">
        <a href="https://github.com/galortega/roundest-mon">Github</a>
        {" | "}
        <Link href="/results">
          <a>Results</a>
        </Link>
      </div>
    </div>
  );
};

type PokemonFromServer = inferQueryResponse<"get-pokemon-by-id">;

const PokemonListing: React.FC<{
  pokemon: PokemonFromServer;
  vote: () => void;
}> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={props.pokemon.spriteUrl}
        layout="fixed"
        width={256}
        height={256}
      />
      <div className="text-xl text-center capitalize mt-[-2rem]">
        {props.pokemon.name}
      </div>
      <button className={btn} onClick={() => props.vote()}>
        Rounder
      </button>
    </div>
  );
};

export default Home;
