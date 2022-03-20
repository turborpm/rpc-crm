import { inferQueryResponse } from "@/utils/trpc";
import Image from "next/image";

const btnPrimary =
  "inline-block font-medium border border-solid cursor-pointer text-center text-xs py-1 px-2 text-white bg-pink-600 border-pink-600 hover:bg-white hover:text-pink-600";

type PokemonFromServer = inferQueryResponse<"get-pokemon-by-id">;

const PokemonListing: React.FC<{
  pokemon: PokemonFromServer;
  vote: () => void;
  disabled: boolean;
}> = (props) => {
  return (
    <div className="isolate">
      <div
        className={`relative hover:ring-1 ring-black hover:saturate-200 ${
          props.disabled && "opacity-50"
        }`}
      >
        <div className="absolute -right-2 -bottom-2 bg-black h-full w-full -z-50" />
        <div className="divide-y-2 divide-black bg-white  border-2 border-black items-center">
          <Image
            src={props.pokemon.spriteUrl}
            layout="fixed"
            width={256}
            height={200}
            alt={props.pokemon.name}
          />

          <div className="text-xl text-center tracking-widest capitalize mt-[-2rem] w-full p-2">
            {props.pokemon.name}
          </div>
          <div className="grid grid-cols-3  divide-x-2 divide-black w-full">
            <div className="col-span-2 p-2 align-middle flex">
              <div className="w-5 h-5 rounded-full bg-black" />
              &nbsp; 100% (23)
            </div>
            <div className="p-2">
              <button
                className={btnPrimary}
                onClick={() => props.vote()}
                disabled={props.disabled}
              >
                Rounder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonListing;
