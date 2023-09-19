import { model, models, Schema } from "mongoose";

const PokemonSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  score: {
    type: String
  },
  scoreTemporarily: {
    type: String
  },
  owner: {
    type: String,
  },
  createdAt: {
    type: Date,
  }
})

const DailyPokemon = models.DailyPokemon || model("DailyPokemon", PokemonSchema);

export default DailyPokemon