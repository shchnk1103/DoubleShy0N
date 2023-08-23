import Image from "next/image";

const PokemonFruit = ({ selectedPokemon }) => {
  return (
    <div className="flex-start flex-row h-[66px] gap-4 pointer-events-none">
      <div className={"pokemon_card"}>
        <span className="text-sm md:text-base">树果：</span>
        {selectedPokemon ? (
          <Image
            src={selectedPokemon.tree_fruit}
            alt={`${selectedPokemon.id} + tree_fruit`}
            width={50}
            height={50}
            className="rounded-full object-contain"
          />
        ) : (
          <span> - </span>
        )}
      </div>

      <div className={"pokemon_card"}>
        <span className="text-sm md:text-base">食材Lv.1:</span>
        {selectedPokemon ? (
          <Image
            src={selectedPokemon.ingredients}
            alt={`${selectedPokemon.id} + ingredients`}
            width={50}
            height={50}
            className="rounded-full object-contain"
          />
        ) : (
          <span> - </span>
        )}
      </div>
    </div>
  );
};

export default PokemonFruit;
