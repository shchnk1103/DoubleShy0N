import React from "react";

const PokemonExpertise = ({ selectedPokemon }) => {
  return (
    <div
      className={
        "bg-gray-200 rounded-2xl h-[66px] p-2 flex-center gap-2 shadow-xl pointer-events-none"
      }
    >
      <span>专长：</span>
      {selectedPokemon ? (
        <span
          className={
            "flex-center gap-1 bg-yellow-500 text-white rounded-xl py-1 px-4"
          }
        >
          {selectedPokemon.expertise}
        </span>
      ) : (
        <span
          className={
            "flex-center gap-1 bg-yellow-500 text-white rounded-xl py-1 px-4"
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
