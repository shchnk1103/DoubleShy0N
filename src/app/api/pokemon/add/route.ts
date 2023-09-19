import { connectToDatabase } from "@/utils/database";
import DailyPokemon from "@/models/pokemons";

export const POST = async (req, res) => {
  try {
    const {userID, name, score, scoreTemporarily} = await req.json()
    await connectToDatabase();

    await DailyPokemon.create({
      name: name,
      score: score,
      scoreTemporarily: scoreTemporarily,
      owner: userID,
      createdAt: new Date()
    })

    return new Response(JSON.stringify({"message": "add success"}), {status: 200});
  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch a new article"), {
      status: 500,
    });
  }
};
