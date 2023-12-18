"use client";

const PokemonAddForm = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <form
      onSubmit={() => handleSubmit}
      className="flex-center w-full h-full gap-4 flex-wrap"
    >
      <div className="w-full flex flex-row justify-center flex-start gap-2">
        <span className="text-left text-xl font-semibold">Name:</span>
        <input type="text" className="rounded-md shadow-sm" />
      </div>

      <div className="w-full flex flex-row justify-center flex-start gap-2">
        <span className="text-left text-xl font-semibold">Name:</span>
        <input type="text" className="rounded-md shadow-sm" />
      </div>

      <button type="submit" className="w-full">
        Submit
      </button>
    </form>
  );
};

export default PokemonAddForm;
