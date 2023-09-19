import { ObjectId } from "mongoose";

export type Pokemon = {
  id: string;
  name: string;
  img_url: string;
  sleep_type: string;
  expertise: string;
  main_skill: string;
  main_skill_effect: string;
  tree_fruit: string;
  ingredients: string;
  help_interval: string;
  holding_cap: string;
  friendship_points: string;
  help_speed: number;
  help_speed_score: number;
  extra_skill_score: number;
  panel_total_score: number;
  normalized_score: number;
  evolution_potential: number;
  total_score: number;
};

export type PokemonCharacterType = {
  _id: string;
  title: string;
  plus: string;
  minus: string;
};

export type PokemonSecondarySkillType = {
  _id: string;
  secondary_skill_name: string;
  self_consistent: string;
  color: number;
};

export type DailyPokemons = {
  name: string,
  score: string,
  scoreTemporarily: string,
  owner: ObjectId,
  createdAt: Date
}
