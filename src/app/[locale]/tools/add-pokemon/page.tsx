import PokemonAddForm from "@/components/Tools/Pokemon/PokemonAddForm";

const AddPokemon = () => {
  return (
    <div className="w-full h-full padding">
      <h1 className="blue_gradient text-left font-bold text-6xl pt-2 pb-4">
        Add Pokemon
      </h1>

      <PokemonAddForm />
    </div>
  );
};

export default AddPokemon;
