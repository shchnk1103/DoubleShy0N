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
      `http://127.0.0.1:8000/pokemons/?name=${name}`,
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

export const skillScore = {
  帮忙速度S: { 树果: 1, 其他: 0.5 },
  帮忙速度M: { 树果: 2, 其他: 1 },
  树果数量S: { 树果: 4, 其他: 2 },
  帮手奖励: { 食材: 1, 其他: 2 },
  食材几率提升S: { 食材: 1, 其他: 0.5 },
  食材几率提升M: { 食材: 2, 其他: 1 },
  持有上限提升S: { 食材: 0, 其他: 0 },
  持有上限提升M: { 食材: 1, 其他: 0.5 },
  持有上限提升L: { 食材: 2, 其他: 1 },
  技能等级提升S: { 技能: 2, 其他: 1 },
  技能等级提升M: { 技能: 3, 其他: 1.5 },
  技能几率提升S: { 技能: 1, 其他: 0.5 },
  技能几率提升M: { 技能: 2, 其他: 1 },
  活力回复奖励: { 技能: 2, 其他: 1 },
  睡眠EXP奖励: { 技能: 1, 其他: 0.5 },
  研究EXP奖励: { 技能: 1, 其他: 0.5 },
  梦之碎片奖励: { 技能: 1, 其他: 0.5 },
};

export const skillOrder = [1, 0.95, 0.8, 0.5, 0.25];

export const characterScore = {
  plus: {
    活力回复量: 4,
    食材发现率: { 食材: 10, 其他: 2 },
    主技能发动概率: { 技能: 8, 其他: 4 },
    EXP获得量: 4,
    "-": 0,
    帮忙速度: { 树果: 12, 其他: 10 },
  },
  minus: {
    活力回复量: 8,
    食材发现率: { 食材: 10, 其他: 2 },
    主技能发动概率: { 技能: 8, 其他: 4 },
    EXP获得量: 4,
    "-": 0,
    帮忙速度: { 树果: 12, 其他: 10 },
  },
};
