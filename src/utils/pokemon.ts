import { PokemonSecondarySkillType } from "../../types/Pokemon";

export const fetchPokemons = async (currentPage: number) => {
  try {
    const response = await fetch(
      `https://django-api-topaz.vercel.app/pokemons/?page=${currentPage}`,
      { method: "GET" }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPokemonByName = async (name: string) => {
  try {
    const response = await fetch(
      `https://django-api-topaz.vercel.app/pokemons/?name=${name}`,
      { method: "GET" }
    );

    const data = await response.json();

    return data;
  } catch (error) {}
};

export const fetchCharacters = async () => {
  try {
    const response = await fetch(
      `https://django-api-topaz.vercel.app/pokemon-chacators/`,
      { method: "GET" }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCharactersByTitle = async (title: string) => {
  try {
    const response = await fetch(
      `https://django-api-topaz.vercel.app/pokemon-chacators/?title=${title}`,
      { method: "GET" }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSecondarySkills = async () => {
  try {
    const response = await fetch(
      `https://django-api-topaz.vercel.app/pokemon-secondary-skills/`,
      { method: "GET" }
    );

    const data = await response.json();

    const sortedData = data.sort(
      (a: PokemonSecondarySkillType, b: PokemonSecondarySkillType) => {
        if (a.color < b.color) {
          return -1;
        }
        if (a.color > b.color) {
          return 1;
        }
        return 0;
      }
    );

    return sortedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSecondarySkillsByName = async (name: string) => {
  try {
    const response = await fetch(
      `https://django-api-topaz.vercel.app/pokemon-secondary-skills/?secondary_skill_name=${name}`,
      { method: "GET" }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const skillScore = {
  "帮忙速度S": { "树果": 1, "其他": 0.5 },
  "帮忙速度M": { "树果": 2, "其他": 1 },
  "树果数量S": { "树果": 4, "其他": 2 },
  "帮手奖励": { "食材": 1, "其他": 2 },
  "食材几率提升S": { "食材": 1, "其他": 0.5 },
  "食材几率提升M": { "食材": 2, "其他": 1 },
  "持有上限提升S": { "食材": 0, "其他": 0 },
  "持有上限提升M": { "食材": 1, "其他": 0.5 },
  "持有上限提升L": { "食材": 2, "其他": 1 },
  "技能等级提升S": { "技能": 2, "其他": 1 },
  "技能等级提升M": { "技能": 3, "其他": 1.5 },
  "技能几率提升S": { "技能": 1, "其他": 0.5 },
  "技能几率提升M": { "技能": 2, "其他": 1 },
  "活力回复奖励": { "技能": 2, "其他": 1 },
  "睡眠EXP奖励": { "技能": 1, "其他": 0.5 },
  "研究EXP奖励": { "技能": 1, "其他": 0.5 },
  "梦之碎片奖励": { "技能": 1, "其他": 0.5 },
};

export const skillOrder = [1, 0.95, 0.8, 0.5, 0.25];

export const characterScore = {
  plus: {
    "活力回复量": 4,
    "食材发现率": { "食材": 10, "其他": 2 },
    "主技能发动概率": { "技能": 8, "其他": 4 },
    "EXP获得量": 4,
    "-": 0,
    "帮忙速度": { "树果": 12, "其他": 10 },
  },
  minus: {
    "活力回复量": 8,
    "食材发现率": { "食材": 10, "其他": 2 },
    "主技能发动概率": { "技能": 8, "其他": 4 },
    "EXP获得量": 4,
    "-": 0,
    "帮忙速度": { "树果": 12, "其他": 10 },
  },
};

export const temporaryScore = {
  "树果": {
    "否": 0,
    "一次产1树果": 3,
    "一次产2树果": 6,
    "一次产3树果": 9,
  },
  "食材": {
    "否": 0,
    "单个食材": 2,
    "双倍食材": 4,
  },
};

const score_to_level = [
  { score: 0, level: "F" },
  { score: 10, level: "E" },
  { score: 20, level: "D" },
  { score: 30, level: "C" },
  { score: 40, level: "B" },
  { score: 50, level: "A" },
  { score: 60, level: "S" },
];

export const pokemonScoreInfo = (score: number) => {
  for (let index = score_to_level.length - 1; index > 0; index--) {
    const element = score_to_level[index];
    if (score >= element.score) {
      const class_name = `score_${element.level.toLowerCase}`;
      return [element.level, class_name];
    }
  }
};

export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      "http://47.98.244.246:8000/pokemon-image-uploads/",
      {
        method: "POST",
        body: formData,
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};
