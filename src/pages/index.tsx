import PokemonListing from "@/components/pokemonListing";
import { trpc } from "@/utils/trpc";
import { useGetPokemonPair } from "@/utils/useGetPokemonPair";
import type { NextPage } from "next";
import React from "react";
import Layout from "@/components/layout";

const Home: NextPage = () => {
  const { data: session } = trpc.useQuery(["next-auth.getSession"]);
  const { firstPokemon, secondPokemon, fetchingNext, voteForRoundest } =
    useGetPokemonPair();

  return (
    <Layout session={session}>
      <>
        {firstPokemon && secondPokemon ? (
          <>
            <div className="hidden md:flex my-4 relative bg-white shadow-2xl shadow-black border-2 border-black justify-between items-center max-w-2xl flex-col sm:p-4 md:flex-row animate-fade-in p-8">
              <div className="absolute -right-2 -bottom-2 bg-black h-full w-full -z-50" />
              <PokemonListing
                pokemon={firstPokemon}
                vote={() => voteForRoundest(firstPokemon.id)}
                disabled={fetchingNext}
              />
              <div className="p-8 font-bold underline underline-offset-2 decoration-2 decoration-pink-600">
                Vs
              </div>
              <PokemonListing
                pokemon={secondPokemon}
                vote={() => voteForRoundest(secondPokemon.id)}
                disabled={fetchingNext}
              />
            </div>
            <div className="md:hidden my-1 justify-between items-center flex flex-col">
              <PokemonListing
                pokemon={firstPokemon}
                vote={() => voteForRoundest(firstPokemon.id)}
                disabled={fetchingNext}
              />
              <div className="pt-3 pb-2 font-bold underline underline-offset-2 decoration-2 decoration-pink-600">
                Vs
              </div>
              <PokemonListing
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
    </Layout>
  );
};

export default Home;
