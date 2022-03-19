import { inferQueryResponse } from "@/utils/trpc";
import Image from "next/image";

const btnPrimary =
  "inline-block rounded-sm font-medium border border-solid cursor-pointer text-center text-xs py-1 px-2 text-white bg-gray-400 border-gray-400 hover:bg-gray-600 hover:border-gray-600";

type PokemonFromServer = inferQueryResponse<"get-pokemon-by-id">;

const PokemonListing: React.FC<{
  pokemon: PokemonFromServer;
  vote: () => void;
  disabled: boolean;
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

export default PokemonListing;
