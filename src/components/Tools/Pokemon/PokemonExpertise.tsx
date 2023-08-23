import React from "react";

const PokemonExpertise = ({ selectedPokemon }) => {
  return (
    <div className={"pokemon_card pointer-events-none"}>
      <span className={"text-sm md:text-base whitespace-nowrap"}>专长：</span>
      {selectedPokemon ? (
        <span
          className={
            "flex-center flex-row gap-1 bg-yellow-500 text-white text-sm md:text-base rounded-xl py-1 px-4 whitespace-nowrap"
          }
        >
          {selectedPokemon.expertise}
        </span>
      ) : (
        <span
          className={
            "flex-center flex-row gap-1 bg-yellow-500 text-white text-sm md:text-base rounded-xl py-1 px-4"
          }
        >
          {" "}
          -{" "}
        </span>
      )}
    </div>
  );
};

export default PokemonExpertise;
