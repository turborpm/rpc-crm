import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { inferQueryResponse, trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { LockOutlined, MenuOutlined } from "@ant-design/icons";
import { signIn, signOut } from "next-auth/react";
import PokemonListing from "@/components/pokemonListing";
import { usePlausible } from "next-plausible";
import { useGetPokemonPair } from "@/utils/useGetPokemonPair";

const btnSecondary =
  "inline-block rounded-sm font-medium border border-solid text-center py-1 px-2 text-blue-400 bg-transparent border-blue-400 hover:bg-blue-400 hover:border-blue-400";

const Home: NextPage = () => {
  const { data: session } = trpc.useQuery(["next-auth.getSession"]);
  const { firstPokemon, secondPokemon, voteForRoundest, fetchingNext } =
    useGetPokemonPair();
    
  return (
    <>
      <Head>
        <title>Roundest Pokemon</title>
      </Head>
      <div className="h-screen w-screen flex flex-col justify-between align-center items-center">
        <div className="w-screen flex items-center pt-8 px-6 static">
          {session && (
            <div className="hidden md:inline object-cover mr-2 rounded-full absolute">
              <Image
                className="rounded-full"
                src={`${session?.user?.image}`}
                alt="Profile image"
                layout="fixed"
                height={42}
                width={42}
              />
            </div>
          )}
          <div className="text-2xl mx-auto">Which Pokémon is Rounder?</div>
          <button
            className={`hidden md:inline-block absolute right-12 ${btnSecondary}`}
            onClick={() => (!session ? signIn() : signOut())}
          >
            <div className="flex items-center">
              <LockOutlined className="mr-2" />
              {session ? "Sign Out" : "Sign In"}
            </div>
          </button>
          <MenuOutlined className="bottom-12 right-8 md:bottom-4 md:right-12 bg-red-400 p-3 rounded-full absolute drop-shadow-xl transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300" />
        </div>

        {firstPokemon && secondPokemon && (
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
        )}
        {!(firstPokemon && secondPokemon) && <img src="/grid.svg" />}
        <div className="w-full text-xl text-center pb-2">
          <a href="https://github.com/galortega/roundest-mon">Github</a>
          {" | "}
          <Link href="/results">
            <a>Results</a>
          </Link>
          {" | "}
          <Link href="/resultsByUser">
            <a>My Results</a>
          </Link>
          <span className="md:hidden">
            {" | "}
            <button
              className={btnSecondary}
              onClick={() => (!session ? signIn() : signOut())}
            >
              <div className="flex items-center text-xs">
                {session ? (
                  <div className="inline mr-2">
                    <Image
                      className="object-cover rounded-full"
                      src={`${session?.user?.image}`}
                      alt="Profile image"
                      height={18}
                      width={18}
                    />
                  </div>
                ) : (
                  <LockOutlined className="mr-1" />
                )}
                {session ? "Sign Out" : "Sign In"}
              </div>
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default Home;
