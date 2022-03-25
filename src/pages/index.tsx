import PokemonCard from "@/components/pokemonCard";
import { useGetPokemonPair } from "@/utils/useGetPokemonPair";
import type { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
  const { firstPokemon, secondPokemon, fetchingNext, voteForRoundest } =
    useGetPokemonPair();

  return (
    <>
      {firstPokemon && secondPokemon ? (
        <>
          {/* Desktop */}
          <div className="hidden md:flex relative bg-white shadow-2xl shadow-black border-2 border-black justify-between items-center max-w-2xl flex-row animate-fade-in p-5">
            <div className="absolute -right-2 -bottom-2 bg-black h-full w-full -z-50" />
            <PokemonCard
              pokemon={firstPokemon}
              vote={() => voteForRoundest(firstPokemon.id)}
              disabled={fetchingNext}
            />
            <div className="p-8 font-bold underline underline-offset-2 decoration-2 decoration-pink-600">
              Vs
            </div>
            <PokemonCard
              pokemon={secondPokemon}
              vote={() => voteForRoundest(secondPokemon.id)}
              disabled={fetchingNext}
            />
          </div>
          {/* Mobile */}
          <div className="md:hidden my-1 justify-between items-center flex flex-col">
            <PokemonCard
              pokemon={firstPokemon}
              vote={() => voteForRoundest(firstPokemon.id)}
              disabled={fetchingNext}
            />
            <div className="pt-3 pb-2 font-bold underline underline-offset-2 decoration-2 decoration-pink-600">
              Vs
            </div>
            <PokemonCard
              pokemon={secondPokemon}
              vote={() => voteForRoundest(secondPokemon.id)}
              disabled={fetchingNext}
            />
          </div>
        </>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/grid.svg" alt="loading" className="invert" />
      )}
    </>
  );
};

export default Home;
