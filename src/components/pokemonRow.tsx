import { generateCountPercent } from "@/utils/generateCountPercent";
import { PokemonQueryResult } from "@/utils/getPokemonInOrder";
import Image from "next/image";

const PokemonListing: React.FC<{
  pokemon: PokemonQueryResult[number];
}> = ({ pokemon }) => {
  return (
    <div className="flex border-b p-2 items-center justify-between border-2 hover:ring-2 ring-offset-1 ring-black">
      <div className="flex items-center">
        <Image
          src={pokemon.spriteUrl}
          layout="fixed"
          width={64}
          height={64}
          alt={pokemon.name}
        />
        <div className="capitalze">{pokemon.name}</div>
      </div>
      <div className="pr-1">{generateCountPercent(pokemon)}%</div>
    </div>
  );
};

export default PokemonListing;
