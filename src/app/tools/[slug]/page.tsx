"use client";

import AnimatedText from "@/components/AnimatedText";
import PokemonCharacter from "@/components/Tools/PokemonCharacter";
import PokemonDropDown from "@/components/Tools/PokemonDropDown";
import { PokemonTool } from "@/components/Tools/ToolTypes";
import { useEffect, useState } from "react";
import {
  Pokemon,
  PokemonCharacterType,
  PokemonSecondarySkillType,
} from "../../../../types/Pokemon";
import Image from "next/image";
import PokemonSecondarySkill from "@/components/Tools/PokemonSecondarySkill";
import {
  characterScore,
  fetchCharacters,
  fetchPokemons,
  fetchSecondarySkills,
  skillOrder,
  skillScore,
} from "@/utils/pokemon";
import PokemonFruit from "@/components/Tools/PokemonFruit";
import PokemonExpertise from "@/components/Tools/PokemonExpertise";
import { FaStar } from "react-icons/fa";

type Props = {
  params: {
    slug: string;
  };
};

const ToolDetail = ({ params }: Props) => {
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [characters, setCharacters] = useState<PokemonCharacterType[]>([]);
  const [secondarySkills, setSecondarySkills] = useState<
    PokemonSecondarySkillType[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean[]>([true, false]); // [0] -> Fetching, [1] -> No more data
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();
  const [selectedCharacter, setSelectedCharacter] =
    useState<PokemonCharacterType>();
  const [selectedSecondarySkill, setSelectedSecondarySkill] = useState<
    PokemonSecondarySkillType[]
  >([undefined, undefined, undefined, undefined, undefined]);
  const [totalScore, setTotalScore] = useState<number>(0);

  const submit_disabled =
    selectedPokemon !== undefined &&
    selectedCharacter !== undefined &&
    selectedSecondarySkill.every((skill) => skill !== undefined);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    fetchPokemons(currentPage).then((data) => {
      if (data.length === 0) {
        setIsLoading([false, true]);
        return;
      }

      setPokemons((prePokemons) => [...prePokemons, ...data]);
      setIsLoading([false, false]);
    });
  }, [currentPage, initialLoad]);

  useEffect(() => {
    fetchCharacters().then((data) => {
      setCharacters(data);
    });

    fetchSecondarySkills().then((data) => {
      setSecondarySkills(data);
    });
  }, []);

  const handleClick = () => {
    // 面板 + 潜力分
    const pokemon_score = selectedPokemon?.total_score;

    let pokemon_skill_scores = [0, 0, 0, 0, 0];
    let consistent = ["", "", "", "", ""];

    for (
      let index = 0, len = pokemon_skill_scores.length;
      index < len;
      index++
    ) {
      // 技能颜色分
      const skill_color = selectedSecondarySkill[index]?.color;

      // 技能自洽
      const skill_self_consistent =
        selectedSecondarySkill[index]?.self_consistent;
      consistent[index] = skill_self_consistent;

      // 技能匹配分
      let skill_score = 0;
      const secondary_skill_name =
        selectedSecondarySkill[index]?.secondary_skill_name;
      const expertise = selectedPokemon?.expertise;
      if (expertise && secondary_skill_name) {
        if (skillScore[secondary_skill_name]) {
          if (skillScore[secondary_skill_name][expertise]) {
            skill_score = skillScore[secondary_skill_name][expertise];
          } else {
            skill_score = skillScore[secondary_skill_name]["其他"];
          }
        }
      }

      // 副技能顺序分
      const skill_order_score = skill_score * skillOrder[index];

      // 副技能总得分
      const score =
        Number(skill_color) + Number(skill_score) + Number(skill_order_score);

      pokemon_skill_scores[index] = score;
    }

    // 性格分
    const pokemon_character_plus =
      characterScore["plus"][selectedCharacter?.plus];
    const pokemon_character_minus =
      characterScore["minus"][selectedCharacter?.minus];

    // 技能自洽分
    let consistent_score = 0;
    for (let index = 0; index < consistent.length; index++) {
      for (let j = index + 1; j < consistent.length; j++) {
        if (consistent[index] === consistent[j]) {
          consistent_score += 2;
          break;
        }
      }
    }

    // 总分
    const total_score =
      pokemon_score +
      pokemon_skill_scores.reduce((a, b) => a + b) +
      consistent_score +
      Number(pokemon_character_plus) -
      Number(pokemon_character_minus);
    const formatted_total_score = Number(total_score.toFixed(2));
    setTotalScore(formatted_total_score);
  };

  return (
    <>
      {params.slug == PokemonTool.name ? (
        <div className="min-h-[75vh] w-full flex-start flex-col gap-8">
          {/* Head */}
          <div className={"text-left w-full flex-start flex-col gap-2"}>
            <h1 className={"blue_gradient text-5xl font-semibold mt-4"}>
              {PokemonTool.title}
            </h1>
            <span className={"text-xl text-gray-400"}>
              {PokemonTool.description}
            </span>
          </div>

          <div className={"w-full flex-start lg:flex-row flex-col gap-6"}>
            {/* Content */}
            <div
              className={
                "w-full md:w-fit h-full filter backdrop-blur-3xl rounded-2xl shadow-xl border-[1px] p-4 flex-start flex-col gap-4 md:gap-6"
              }
            >
              <div className={"w-full flex-start md:flex-row flex-col gap-4"}>
                <div className={"w-fit flex-start flex-row gap-4"}>
                  {/* 宝可梦 */}
                  <PokemonDropDown
                    pokemons={pokemons}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    selectedPokemon={selectedPokemon}
                    setSelectedPokemon={setSelectedPokemon}
                  />

                  {/* 专长 */}
                  <PokemonExpertise selectedPokemon={selectedPokemon} />
                </div>

                <div className={"w-full flex-start flex-row gap-4"}>
                  {/* 树果和食材 */}
                  <PokemonFruit selectedPokemon={selectedPokemon} />
                </div>
              </div>

              {/* 性格 */}
              <div className={"flex-start flex-row gap-4"}>
                <PokemonCharacter
                  characters={characters}
                  selectedCharacter={selectedCharacter}
                  setSelectedCharacter={setSelectedCharacter}
                />
              </div>

              {/* 副技能 */}
              <div className={"flex-start flex-row gap-4"}>
                <PokemonSecondarySkill
                  secondarySkills={secondarySkills}
                  selectedSecondarySkill={selectedSecondarySkill}
                  setSelectedSecondarySkill={setSelectedSecondarySkill}
                />
              </div>

              <button
                className={`w-full py-3 px-4 rounded-2xl shadow-2xl transition-all ${
                  !submit_disabled
                    ? "bg-gray-200 text-gray-400"
                    : "bg-blue-400 text-white hover:-translate-y-1 hover:shadow-md"
                }`}
                onClick={handleClick}
                disabled={!submit_disabled}
              >
                计算分数
              </button>
            </div>

            {/* Result */}
            {totalScore !== 0 && (
              <div
                className={
                  "h-full filter backdrop-blur-3xl rounded-2xl shadow-xl border-[1px] p-4 flex-start flex-col gap-6"
                }
              >
                <div className="relative -z-20 h-28 w-28">
                  <FaStar className="w-28 h-28 -z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-300" />
                  {totalScore >= 60 ? (
                    <span className="score_s">S</span>
                  ) : totalScore >= 50 ? (
                    <span className="score_a">A</span>
                  ) : totalScore >= 40 ? (
                    <span className="score_b">B</span>
                  ) : totalScore >= 30 ? (
                    <span className="score_c">C</span>
                  ) : totalScore >= 20 ? (
                    <span className="score_d">D</span>
                  ) : totalScore >= 10 ? (
                    <span className="score_e">E</span>
                  ) : (
                    <span className="score_f">F</span>
                  )}
                </div>

                <span className="w-full flex-center gap-1 font-semibold">
                  {totalScore}{" "}
                  <span className="text-gray-500 text-sm"> /70</span>
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <AnimatedText
          text={"loading..."}
          className="blue_gradient text-2xl md:text-6xl capitalize my-8 min-h-[400px] flex-center"
        />
      )}
    </>
  );
};

export default ToolDetail;
