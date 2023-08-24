"use client";

import AnimatedText from "@/components/AnimatedText";
import PokemonCharacter from "@/components/Tools/Pokemon/PokemonCharacter";
import PokemonDropDown from "@/components/Tools/Pokemon/PokemonDropDown";
import { PokemonTool } from "@/components/Tools/ToolTypes";
import { useEffect, useState } from "react";
import {
  Pokemon,
  PokemonCharacterType,
  PokemonSecondarySkillType,
} from "../../../../types/Pokemon";
import PokemonSecondarySkill from "@/components/Tools/Pokemon/PokemonSecondarySkill";
import {
  characterScore,
  fetchCharacters,
  fetchPokemons,
  fetchSecondarySkills,
  skillOrder,
  skillScore,
} from "@/utils/pokemon";
import PokemonFruit from "@/components/Tools/Pokemon/PokemonFruit";
import PokemonExpertise from "@/components/Tools/Pokemon/PokemonExpertise";
import PokemonScoreResult from "@/components/Tools/Pokemon/PokemonScoreResult";
import PokemonFooter from "@/components/Tools/Pokemon/PokemonFooter";
import PokemonTemporary from "@/components/Tools/Pokemon/PokemonTemporary";
import PokemonTip from "@/components/Tools/Pokemon/PokemonTip";
import ImageUpload from "@/components/Tools/Pokemon/ImageUpload";

type Props = {
  params: {
    slug: string;
  };
};

const ToolDetail = ({ params }: Props) => {
  // 初始化
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [characters, setCharacters] = useState<PokemonCharacterType[]>([]);
  const [secondarySkills, setSecondarySkills] = useState<
    PokemonSecondarySkillType[]
  >([]);
  // 判断是否
  const [isLoading, setIsLoading] = useState<boolean[]>([true, false]); // [0] -> Fetching, [1] -> No more data
  const [isSelectedPokemon, setIsSelectedPokemon] = useState<boolean>(false);
  const [isSelectedCharacter, setIsSelectedCharacter] =
    useState<boolean>(false);
  const [isSelectedSecondarySkills, setIsSelectedSecondarySkills] = useState<
    boolean[]
  >([false, false, false, false, false]);
  // 选择
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();
  const [selectedCharacter, setSelectedCharacter] =
    useState<PokemonCharacterType>();
  const [selectedSecondarySkill, setSelectedSecondarySkill] = useState<
    PokemonSecondarySkillType[]
  >([undefined, undefined, undefined, undefined, undefined]);
  const [selectedTemporary, setSelectedTemporary] = useState<
    [string, number][]
  >([]);
  // 分数
  const [totalScore, setTotalScore] = useState<number>(0);
  const [totalScoreTemporarily, setTotalScoreTemporarily] = useState<number>(0);

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
    const plus = characterScore["plus"][selectedCharacter?.plus];
    let pokemon_character_plus = 0;
    if (selectedCharacter?.plus === "食材发现率") {
      const key_word = selectedPokemon?.expertise == "食材" ? "食材" : "其他";
      pokemon_character_plus = plus[key_word];
    } else if (selectedCharacter?.plus === "帮忙速度") {
      const key_word = selectedPokemon?.expertise == "树果" ? "树果" : "其他";
      pokemon_character_plus = plus[key_word];
    } else if (selectedCharacter?.plus === "主技能发动概率") {
      const key_word = selectedPokemon?.expertise === "技能" ? "技能" : "其他";
      pokemon_character_plus = plus[key_word];
      if (
        ["食材获取S", "料理强化S", "能量填充M"].includes(
          selectedPokemon?.main_skill
        )
      ) {
        pokemon_character_plus += 2;
      }
    } else {
      pokemon_character_plus = plus;
    }

    const minus = characterScore["minus"][selectedCharacter?.minus];
    let pokemon_character_minus = 0;
    if (selectedCharacter?.minus === "食材发现率") {
      const key_word = selectedPokemon?.expertise == "食材" ? "食材" : "其他";
      pokemon_character_minus = minus[key_word];
    } else if (selectedCharacter?.minus === "帮忙速度") {
      const key_word = selectedPokemon?.expertise == "树果" ? "树果" : "其他";
      pokemon_character_minus = minus[key_word];
    } else if (selectedCharacter?.minus === "主技能发动概率") {
      const key_word = selectedPokemon?.expertise === "技能" ? "技能" : "其他";
      pokemon_character_minus = minus[key_word];
      if (
        ["食材获取S", "料理强化S", "能量填充M"].includes(
          selectedPokemon?.main_skill
        )
      ) {
        pokemon_character_minus += 2;
      }
    } else {
      pokemon_character_minus = minus;
    }

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

    // 临时分
    let temporary_score = 0;
    if (selectedTemporary.length > 0) {
      if (selectedTemporary[0]) {
        temporary_score += selectedTemporary[0][1];
      }
      if (selectedTemporary[1]) {
        temporary_score += selectedTemporary[1][1];
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

    // 临时总分
    const total_score_temporarily = total_score + temporary_score;
    const formatted_total_score_temporarily = Number(
      total_score_temporarily.toFixed(2)
    );
    setTotalScoreTemporarily(formatted_total_score_temporarily);
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

          {/* Content */}
          <div className={"w-full flex-start lg:flex-row flex-col gap-6"}>
            {/* Content */}
            <div
              className={
                "w-full lg:w-3/4 md:w-fit h-full lg:h-[468px] filter backdrop-blur-3xl rounded-2xl shadow-xl border-[1px] p-4 flex-start flex-col gap-2 md:gap-6"
              }
            >
              <div className={"w-full flex-start md:flex-row flex-col gap-2"}>
                <div className={"w-fit flex-start flex-row gap-2"}>
                  {/* 宝可梦 */}
                  <PokemonDropDown
                    pokemons={pokemons}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    selectedPokemon={selectedPokemon}
                    setSelectedPokemon={setSelectedPokemon}
                    selected={isSelectedPokemon}
                    setSelected={setIsSelectedPokemon}
                  />

                  {/* 专长 */}
                  <PokemonExpertise selectedPokemon={selectedPokemon} />
                </div>

                <div className={"w-full flex-start flex-row gap-2"}>
                  {/* 树果和食材 */}
                  <PokemonFruit selectedPokemon={selectedPokemon} />
                </div>
              </div>

              {/* 性格 */}
              <div className={"flex-start flex-row gap-2"}>
                <PokemonCharacter
                  characters={characters}
                  selectedCharacter={selectedCharacter}
                  setSelectedCharacter={setSelectedCharacter}
                  selected={isSelectedCharacter}
                  setSelected={setIsSelectedCharacter}
                />
              </div>

              {/* 副技能 */}
              <div className={"flex-start flex-row gap-2"}>
                <PokemonSecondarySkill
                  secondarySkills={secondarySkills}
                  selectedSecondarySkill={selectedSecondarySkill}
                  setSelectedSecondarySkill={setSelectedSecondarySkill}
                  selected={isSelectedSecondarySkills}
                  setSelected={setIsSelectedSecondarySkills}
                />
              </div>

              <div className={"flex-start flex-row gap-2"}>
                <PokemonTemporary
                  selectedTemporary={selectedTemporary}
                  setSelectedTemporary={setSelectedTemporary}
                />

                <PokemonTip />
              </div>

              {/* 计算分数按钮 */}
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
            {totalScore === 0 ? (
              // <ImageUpload
              //   setSelectedPokemon={setSelectedPokemon}
              //   setSelectedCharacter={setSelectedCharacter}
              //   setSelectedSecondarySkill={setSelectedSecondarySkill}
              //   setIsSelectedPokemon={setIsSelectedPokemon}
              //   setIsSelectedCharacter={setIsSelectedCharacter}
              //   setIsSelectedSecondarySkills={setIsSelectedSecondarySkills}
              // />
              <div></div>
            ) : (
              <PokemonScoreResult
                totalScore={totalScore}
                totalScoreTemporarily={totalScoreTemporarily}
              />
            )}
          </div>

          {/* Footer */}
          <PokemonFooter />
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
