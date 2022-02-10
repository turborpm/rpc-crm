import type { GetServerSideProps } from "next";
import { prisma } from "@/backend/utils/prisma";

import Image from "next/image";
import Head from "next/head";
import { AsyncReturnType } from "@/utils/ts-bs";
import React from "react";

const getPokemonInOrder = async () =>
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
  });

type PokemonQueryResult = AsyncReturnType<typeof getPokemonInOrder>;

const generateCountPercent = (pokemon: PokemonQueryResult[number]) => {
  const { VoteFor, VoteAgainst } = pokemon._count;
  if (VoteFor + VoteAgainst === 0) return 0;
  return ((VoteFor / (VoteFor + VoteAgainst)) * 100).toFixed(2);
};

const PokemonListing: React.FC<{ pokemon: PokemonQueryResult[number] }> = ({
  pokemon,
}) => {
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

const ResultsPage: React.FC<{
  pokemon: PokemonQueryResult;
}> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl">Results</h2>
      <div className="p-2" />
      <div className="flex flex-col w-full max-w-2xl border">
        {props.pokemon.map((currentPokemon, index) => (
          <PokemonListing pokemon={currentPokemon} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;

export const getStaticProps: GetServerSideProps = async () => {
  const pokemonOrdered = await getPokemonInOrder();
  return { props: { pokemon: pokemonOrdered, revalidate: 60 } };
};
