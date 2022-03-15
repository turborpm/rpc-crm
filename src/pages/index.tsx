import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { inferQueryResponse, trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { LockOutlined, MenuOutlined } from "@ant-design/icons";
import { signIn, signOut } from "next-auth/react";

const btnPrimary =
  "inline-block rounded-sm font-medium border border-solid cursor-pointer text-center text-xs py-1 px-2 text-white bg-gray-400 border-gray-400 hover:bg-gray-600 hover:border-gray-600";
const btnSecondary =
  "inline-block rounded-sm font-medium border border-solid text-center py-1 px-2 text-blue-400 bg-transparent border-blue-400 hover:bg-blue-400 hover:border-blue-400";

const Home: NextPage = () => {
  const { data: session } = trpc.useQuery(["next-auth.getSession"]);
  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

  const voteMutation = trpc.useMutation(["cast-vote"]);
  const voteForRoundest = (selected: number) => {
    if (selected === first)
      voteMutation.mutate({
        votedFor: first,
        votedAgainst: second,
      });
    else if (selected === second)
      voteMutation.mutate({
        votedFor: second,
        votedAgainst: first,
      });

    updateIds(getOptionsForVote());
  };

  const isDataLoaded =
    !firstPokemon.isLoading &&
    firstPokemon.data &&
    !secondPokemon.isLoading &&
    secondPokemon.data;

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

        {isDataLoaded && (
          <div className="border rounded flex justify-between items-center max-w-2xl flex-col sm:p-4 md:flex-row animate-fade-in p-8">
            <PokemonListing
              pokemon={firstPokemon.data}
              vote={() => voteForRoundest(first)}
            />
            <div className="p-8">Vs</div>
            <PokemonListing
              pokemon={secondPokemon.data}
              vote={() => voteForRoundest(second)}
            />
            <div className="md:p-2" />
          </div>
        )}
        {!isDataLoaded && <img src="/grid.svg" />}
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
        alt={props.pokemon.name}
      />

      <div className="text-xl text-center capitalize mt-[-2rem]">
        {props.pokemon.name}
      </div>
      <button className={btnPrimary} onClick={() => props.vote()}>
        Rounder
      </button>
    </div>
  );
};

export default Home;
