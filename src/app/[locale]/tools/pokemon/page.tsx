"use client";

import { useEffect, useState } from "react";
import AnimatedText from "@/components/AnimatedText";
import PokemonCharacter from "@/components/Tools/Pokemon/PokemonCharacter";
import PokemonDropDown from "@/components/Tools/Pokemon/PokemonDropDown";
import { PokemonTool } from "@/components/Tools/ToolTypes";
import {
  Pokemon,
  PokemonCharacterType,
  PokemonSecondarySkillType,
} from "../../../../../types/Pokemon";
import PokemonSecondarySkill from "@/components/Tools/Pokemon/PokemonSecondarySkill";
import {
  calculatePokemonScore,
  fetchCharacters,
  fetchPokemons,
  fetchSecondarySkills,
} from "@/utils/pokemon";
import PokemonFruit from "@/components/Tools/Pokemon/PokemonFruit";
import PokemonExpertise from "@/components/Tools/Pokemon/PokemonExpertise";
import PokemonScoreResult from "@/components/Tools/Pokemon/PokemonScoreResult";
import PokemonFooter from "@/components/Tools/Pokemon/PokemonFooter";
import PokemonTemporary from "@/components/Tools/Pokemon/PokemonTemporary";
import PokemonTip from "@/components/Tools/Pokemon/PokemonTip";
import ImageUpload from "@/components/Tools/Pokemon/ImageUpload";
import { AiTwotoneStar } from "react-icons/ai";
import { useSession } from "next-auth/react";

const ToolDetail = () => {
  const { data: session } = useSession();
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
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

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
    const { formatted_total_score, formatted_total_score_temporarily } =
      calculatePokemonScore(
        selectedPokemon,
        selectedSecondarySkill,
        selectedCharacter,
        selectedTemporary
      );

    setTotalScore(formatted_total_score);
    setTotalScoreTemporarily(formatted_total_score_temporarily);
  };

  const handleFavouritePokemon = async () => {
    if (!session?.user) {
      alert("请先登录！");
      return;
    }

    if (isFavourite) {
      setIsFavourite(false);
      return;
    }

    const result = await fetch("/api/pokemon/add", {
      method: "POST",
      body: JSON.stringify({
        userID: session?.user["id"],
        name: selectedPokemon.name,
        score: totalScore,
        scoreTemporarily: totalScoreTemporarily,
        img_url: selectedPokemon.img_url,
        isFavorite: isFavourite,
        secondarySkillsName: selectedSecondarySkill.map(
          (skill) => skill.secondary_skill_name
        ),
        secondarySkillsColor: selectedSecondarySkill.map(
          (skill) => skill.color
        ),
        character: selectedCharacter.title,
        characterEffect: {
          plus: selectedCharacter.plus,
          minus: selectedCharacter.minus,
        },
        expertise: selectedPokemon.expertise,
        tree_fruit: selectedPokemon.tree_fruit,
        ingredients: selectedPokemon.ingredients,
      }),
    });

    if (result.ok) {
      setIsFavourite(true);
      alert("收藏成功！");
    }
  };

  return (
    <>
      {pokemons.length !== 0 ? (
        <div className="min-h-[75vh] w-full flex-start flex-col gap-8 padding">
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
                "w-full lg:w-3/4 md:w-full h-full lg:h-[468px] filter backdrop-blur-3xl rounded-2xl shadow-xl border-[1px] p-4 flex-start flex-col gap-2 md:gap-6"
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

              <div className={`w-full flex-center md:gap-4 gap-2`}>
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

                {totalScore !== 0 && totalScoreTemporarily !== 0 && (
                  <div
                    className={`${
                      isFavourite ? "" : "hover:shadow-xl"
                    } md:h-[48px] h-[33px] md:w-[48px] w-[33px] flex-center bg-gray-200 dark:bg-gray-700 rounded-full shadow-md group cursor-pointer`}
                    onClick={handleFavouritePokemon}
                  >
                    <AiTwotoneStar
                      className={`${
                        isFavourite
                          ? "text-amber-400"
                          : "text-gray-800/80 dark:text-gray-300/80 group-hover:text-amber-400"
                      } h-1/2 w-1/2 transition-all `}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Result */}
            {totalScore === 0 ? (
              <ImageUpload
                setSelectedPokemon={setSelectedPokemon}
                setSelectedCharacter={setSelectedCharacter}
                setSelectedSecondarySkill={setSelectedSecondarySkill}
                setIsSelectedPokemon={setIsSelectedPokemon}
                setIsSelectedCharacter={setIsSelectedCharacter}
                setIsSelectedSecondarySkills={setIsSelectedSecondarySkills}
              />
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
