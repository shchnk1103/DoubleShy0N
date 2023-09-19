import { model, models, Schema } from "mongoose";

const PokemonSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  score: {
    type: String,
  },
  scoreTemporarily: {
    type: String,
  },
  owner: {
    type: String,
  },
  img_url: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  isFavorite: {
    type: Boolean,
  },
  secondarySkillsName: {
    type: Array,
  },
  secondarySkillsColors: {
    type: Array,
  },
  character: {
    type: String,
  },
  characterEffect: {
    type: Object,
  },
  expertise: {
    type: String,
  },
  tree_fruit: {
    type: String,
  },
  ingredients: {
    type: String,
  },
});

const DailyPokemon =
  models.DailyPokemon || model("DailyPokemon", PokemonSchema);

export default DailyPokemon;
