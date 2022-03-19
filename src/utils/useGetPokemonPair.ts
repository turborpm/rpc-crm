import { trpc } from "@/utils/trpc";
import { Pokemon } from "@prisma/client";
import { usePlausible } from "next-plausible";

interface PokemonPair {
  firstPokemon?: Pokemon;
  secondPokemon?: Pokemon;
  fetchingNext: boolean;
  voteForRoundest: (selected: number) => void;
}

export const useGetPokemonPair: () => PokemonPair = () => {
  const {
    data: pokemonPair,
    refetch,
    isLoading,
  } = trpc.useQuery(["get-pokemon-pair"], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const voteMutation = trpc.useMutation(["cast-vote"]);
  const plausible = usePlausible();

  const voteForRoundest = (selected: number) => {
    if (!pokemonPair) return; // Early escape to make Typescript happy

    if (selected === pokemonPair?.firstPokemon.id) {
      // If voted for 1st pokemon, fire voteFor with first ID
      voteMutation.mutate({
        votedFor: pokemonPair.firstPokemon.id,
        votedAgainst: pokemonPair.secondPokemon.id,
      });
    } else {
      // else fire voteFor with second ID
      voteMutation.mutate({
        votedFor: pokemonPair.secondPokemon.id,
        votedAgainst: pokemonPair.firstPokemon.id,
      });
    }

    plausible("cast-vote");
    refetch();
  };
  const fetchingNext = voteMutation.isLoading || isLoading;

  return {
    firstPokemon: pokemonPair?.firstPokemon,
    secondPokemon: pokemonPair?.secondPokemon,
    fetchingNext,
    voteForRoundest,
  };
};
