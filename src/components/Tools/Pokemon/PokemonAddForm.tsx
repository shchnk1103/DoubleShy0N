"use client";

import { useRef } from "react";
import { Pokemon } from "../../../../types/Pokemon";

const PokemonAddForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const help_speed =
      Math.round(
        (Number(formRef.current.elements["holding_cap"].value) /
          Number(formRef.current.elements["help_interval"].value)) *
          100
      ) / 100;

    const help_speed_test = Number(help_speed.toFixed(2)) * 10;
    const help_speed_score =
      help_speed_test % 0.5 === 0
        ? help_speed_test
        : Math.floor(help_speed_test);

    // 面板总分 = 帮忙速度分 + 额外技能分
    const panel_total_score =
      help_speed_score +
      Number(formRef.current.elements["extra_skill_score"].value);
    // 归一化
    const normalized_score = panel_total_score * 2 - 1;
    // 总面板 + 潜力
    const total_score =
      normalized_score +
      Number(formRef.current.elements["evolution_potential"].value);

    const newPokemon = {
      id: formRef.current.elements["id"].value,
      name: formRef.current.elements["name"].value,
      name_eng: formRef.current.elements["name_eng"].value,
      img_url: formRef.current.elements["img_url"].value,
      sleep_type: formRef.current.elements["sleep_type"].value,
      expertise: formRef.current.elements["expertise"].value,
      main_skill: formRef.current.elements["main_skill"].value,
      main_skill_effect: formRef.current.elements["main_skill_effect"].value,
      tree_fruit: formRef.current.elements["tree_fruit"].value,
      ingredients: formRef.current.elements["ingredients"].value,
      help_interval: formRef.current.elements["help_interval"].value,
      holding_cap: formRef.current.elements["holding_cap"].value,
      friendship_points: formRef.current.elements["friendship_points"].value,
      evolution_potential:
        formRef.current.elements["evolution_potential"].value,
      extra_skill_score: formRef.current.elements["extra_skill_score"].value,
      help_speed: help_speed,
      help_speed_score: help_speed_score,
      normalized_score: normalized_score,
      panel_total_score: panel_total_score,
      total_score: total_score,
    };

    console.log(newPokemon);

    addPokemon(newPokemon);
  };

  const addPokemon = async (pokemon: Pokemon) => {
    try {
      const response = await fetch(
        "https://django-api-topaz.vercel.app/pokemons/",
        // "http://127.0.0.1:8000/pokemons/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pokemon: pokemon }),
        }
      );

      if (response.ok) {
        console.log("Pokemon added successfully!");
      } else {
        console.log("Pokemon add failed!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex-center w-full h-full gap-4 flex-wrap"
    >
      <div className="w-full flex flex-row justify-center flex-start gap-2">
        <span className="text-left text-xl font-semibold">ID:</span>
        <input type="text" name="id" className="rounded-md shadow-sm" />
      </div>

      <div className="w-full flex flex-row justify-center flex-start gap-2">
        <span className="text-left text-xl font-semibold">Name:</span>
        <input type="text" name="name" className="rounded-md shadow-sm" />
      </div>

      <div className="w-full flex flex-row justify-center flex-start gap-2">
        <span className="text-left text-xl font-semibold">NameEng:</span>
        <input type="text" name="name_eng" className="rounded-md shadow-sm" />
      </div>

      <div className="w-full flex flex-row justify-center flex-start gap-2">
        <span className="text-left text-xl font-semibold">ImageURL:</span>
        <input type="text" name="img_url" className="rounded-md shadow-sm" />
      </div>

      <div className="w-full flex flex-row justify-center flex-start gap-2">
        <span className="text-left text-xl font-semibold">SleepType:</span>
        <select name="sleep_type" id="sleep_type">
          <option value="浅浅入梦">浅浅入梦</option>
          <option value="安然入睡">安然入睡</option>
          <option value="深深入眠">深深入眠</option>
        </select>
      </div>

      <div className="w-full flex flex-row justify-center flex-start gap-2">
        <span className="text-left text-xl font-semibold">Expertise:</span>
        <select name="expertise" id="expertise">
          <option value="树果">树果</option>
          <option value="食材">食材</option>
          <option value="技能">技能</option>
        </select>
      </div>

      <div className="w-full flex flex-row justify-center flex-start gap-2">
        <span className="text-left text-xl font-semibold">MainSkill:</span>
        <input type="text" name="main_skill" className="rounded-md shadow-sm" />
      </div>

      <div className="w-full flex flex-row justify-center flex-start gap-2">
        <span className="text-left text-xl font-semibold">
          MainSkillEffect:
        </span>
        <input
          type="text"
          name="main_skill_effect"
          className="rounded-md shadow-sm"
        />
      </div>

      <div className="w-full flex flex-row justify-center flex-start gap-2">
        <span className="text-left text-xl font-semibold">TreeFruit:</span>
        <input
          type="text"
          name="tree_fruit"
          placeholder="树果"
          className="rounded-md shadow-sm"
        />
      </div>

      <div className="w-full flex flex-row justify-center flex-start gap-2">
        <span className="text-left text-xl font-semibold">Ingredients:</span>
        <input
          type="text"
          name="ingredients"
          placeholder="食材"
          className="rounded-md shadow-sm"
        />
      </div>

      <div className="w-full flex flex-row justify-center flex-start gap-2">
        <span className="text-left text-xl font-semibold">HelpInterval:</span>
        <input
          type="text"
          name="help_interval"
          placeholder="73.33"
          className="rounded-md shadow-sm"
        />
      </div>

      <div className="w-full flex flex-row justify-center flex-start gap-2">
        <span className="text-left text-xl font-semibold">HoldingCap:</span>
        <input
          type="text"
          name="holding_cap"
          placeholder="11"
          className="rounded-md shadow-sm"
        />
      </div>

      <div className="w-full flex flex-row justify-center flex-start gap-2">
        <span className="text-left text-xl font-semibold">
          FriendshipPoints:
        </span>
        <input
          type="text"
          name="friendship_points"
          placeholder="5"
          className="rounded-md shadow-sm"
        />
      </div>

      <div className="w-full flex flex-row justify-center flex-start gap-2">
        <span className="text-left text-xl font-semibold">
          EvolutionPotential:
        </span>
        <input
          type="text"
          name="evolution_potential"
          placeholder="进化潜力 2 4"
          className="rounded-md shadow-sm"
        />
      </div>

      <div className="w-full flex flex-row justify-center flex-start gap-2">
        <span className="text-left text-xl font-semibold">
          ExtraSkillScore:
        </span>
        <input
          type="text"
          name="extra_skill_score"
          placeholder="额外技能分数 1"
          className="rounded-md shadow-sm"
        />
      </div>

      <button type="submit" className="w-full">
        Submit
      </button>
    </form>
  );
};

export default PokemonAddForm;
