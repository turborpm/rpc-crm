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
          <div className="border rounded flex justify-between items-center max-w-2xl flex-col sm:p-4 md:flex-row animate-fade-in p-8">
            <PokemonListing
              pokemon={firstPokemon}
              vote={() => voteForRoundest(firstPokemon.id)}
              disabled={fetchingNext}
            />
            <div className="p-8">Vs</div>
            <PokemonListing
              pokemon={secondPokemon}
              vote={() => voteForRoundest(secondPokemon.id)}
              disabled={fetchingNext}
            />
            <div className="md:p-2" />
          </div>
        ) : (
          <img src="/grid.svg" />
        )}
      </>
    </Layout>
  );
};

export default Home;
