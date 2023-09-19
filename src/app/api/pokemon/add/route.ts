import { connectToDatabase } from "@/utils/database";
import DailyPokemon from "@/models/pokemons";
import { models } from "mongoose";

export const POST = async (req, res) => {
  try {
    const {
      userID,
      name,
      score,
      scoreTemporarily,
      img_url,
      isFavorite,
      secondarySkillsName,
      secondarySkillsColor,
      character,
      characterEffect,
      expertise,
      tree_fruit,
      ingredients,
    } = await req.json();
    await connectToDatabase();

    await DailyPokemon.create({
      name: name,
      score: score,
      scoreTemporarily: scoreTemporarily,
      owner: userID,
      img_url: img_url.toString(),
      createdAt: new Date(),
      isFavorite: isFavorite,
      secondarySkillsName: secondarySkillsName,
      secondarySkillsColors: secondarySkillsColor,
      character: character,
      characterEffect: characterEffect,
      expertise: expertise,
      tree_fruit: tree_fruit,
      ingredients: ingredients,
    });

    return new Response(JSON.stringify({ message: "add success" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify("Failed to add a new daily pokemon"), {
      status: 500,
    });
  }
};
