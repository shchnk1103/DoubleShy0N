import { connectToDatabase } from "@/utils/database";
import DailyPokemon from "@/models/pokemons";
import { DailyPokemons } from "../../../../types/Pokemon";

export const POST = async (req, res) => {
  try {
    const {user} = await req.json()

    await connectToDatabase();

    const pokemons: DailyPokemons[] = await DailyPokemon.find({owner: user.id});

    return new Response(JSON.stringify({"pokemons": pokemons}), {status: 200});
  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch a new article"), {
      status: 500,
    });
  }
};
