"use client";

import "@/styles/pokemon.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { DailyPokemons } from "../../../../types/Pokemon";
import { pokemonScoreInfo } from "@/utils/pokemon";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";

const Pokemon = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [pokemons, setPokemons] = useState<Record<string, DailyPokemons[]>>({});

  useEffect(() => {
    const fetchDailyPokemons = async () => {
      const result = await fetch("/api/pokemon", {
        method: "POST",
        body: JSON.stringify({
          user: user,
        }),
      });

      let pokemons = [];
      await result.json().then((data) => {
        pokemons = data["pokemons"];
      });

      // 将数据分组
      const groupedData = pokemons.reduce((acc, curr) => {
        const date = new Date(curr.createdAt);
        const localDate =
          date.getFullYear() +
          "." +
          (date.getMonth() + 1) +
          "." +
          date.getDate();
        const pokemons = acc[localDate] || [];
        pokemons.push(curr);

        // 检查 acc 对象是否具有 set() 方法
        if (typeof acc.set === "function") {
          acc.set(date, pokemons);
        } else {
          acc[localDate] = pokemons;
        }

        return acc;
      }, {});

      // 设置 groups 状态
      setPokemons(groupedData);
    };

    if (user) {
      fetchDailyPokemons();
    }
  }, [user]);

  return (
    <>
      <div className="h-full w-full flex-start flex-col gap-2 min-h-[70vh]">
        {Object.keys(pokemons).length !== 0 ? (
          Object.keys(pokemons).map((date) => (
            <div key={date} className="w-full flex justify-between items-start">
              <span className="blue_gradient text-3xl font-semibold">
                {date}
              </span>

              <div className="flex-center flex-col gap-4">
                {pokemons[date].map((pokemon, index) => (
                  <div
                    key={index}
                    className="w-[850px] flex-center gap-4 backdrop-filter backdrop-blur-lg bg-white/60 dark:bg-white/30 p-2 shadow-md rounded-xl"
                  >
                    {pokemonScoreInfo(Number(pokemon.score)) && (
                      <span
                        className={
                          "blue_gradient font-bold text-5xl text-center font-serif"
                        }
                      >
                        {pokemonScoreInfo(Number(pokemon.score))[0]}
                      </span>
                    )}

                    <div className="flex-center flex-col gap-1 h-full">
                      <Image
                        alt={"image" + index}
                        src={pokemon.img_url}
                        width={60}
                        height={60}
                        className="rounded-xl shadow-xl"
                        loading="lazy"
                      />
                      <span className="text-blue-600">{pokemon.name}</span>
                    </div>

                    <div className="flex justify-between items-start flex-col gap-3 h-full w-full">
                      {/* Up */}
                      <div className="flex-center flex-row gap-2">
                        <div className="flex-center flex-row gap-1">
                          <span>专长:</span>
                          <span className="bg-yellow-500 text-white rounded-xl py-[1px] px-2 whitespace-nowrap">
                            {pokemon.expertise}
                          </span>
                        </div>

                        <div className="flex-center flex-row gap-1">
                          <span>树果:</span>
                          <Image
                            alt={pokemon._id + "fruit"}
                            src={pokemon.tree_fruit}
                            width={20}
                            height={20}
                            className="rounded-full"
                            loading="lazy"
                          />
                        </div>

                        <div className="flex-center flex-row gap-1">
                          <span>食材Lv1:</span>
                          <Image
                            alt={pokemon._id + "ingredients"}
                            src={pokemon.ingredients}
                            width={20}
                            height={20}
                            className="rounded-full"
                            loading="lazy"
                          />
                        </div>

                        <div className="flex-center flex-row gap-1">
                          <span>性格:</span>
                          <span className="bg-gray-300 dark:bg-gray-600 rounded-xl py-[1px] px-2 text-sm">
                            {pokemon.character}
                          </span>

                          <FaArrowUp className="text-red-600" />
                          <span>{pokemon.characterEffect.plus}</span>

                          <FaArrowDown className="text-green-600" />
                          <span>{pokemon.characterEffect.minus}</span>
                        </div>
                      </div>

                      {/* Down */}
                      <div className="flex-center flex-row gap-2">
                        {pokemon.secondarySkillsColors &&
                          pokemon.secondarySkillsName.map((skill, index) => (
                            <span
                              key={pokemon.name + index}
                              className={`${
                                Number(pokemon.secondarySkillsColors[index]) ==
                                2.0
                                  ? "normal_skill"
                                  : Number(
                                      pokemon.secondarySkillsColors[index]
                                    ) == 4.0
                                  ? "silver_skill"
                                  : "gold_skill"
                              } text-sm md:text-base`}
                            >
                              {skill}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="w-full min-h-[70vh] flex-center relative">
            <AnimatedText text={"快去评定你的宝可梦吧..."} />

            <Link
              href={"/tools/pokemon"}
              className="absolute right-0 bottom-0 bg-white rounded-full p-2 shadow-xl hover:shadow-2xl text-blue-600 hover:-translate-y-2 hover:scale-125 transition-all"
            >
              Go
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Pokemon;
