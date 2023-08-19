"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useState } from "react";
import "@/styles/pokemon.css";
import { PokemonSecondarySkillType } from "../../../types/Pokemon";

type Props = {
  secondarySkills: PokemonSecondarySkillType[];
  selectedSecondarySkill: PokemonSecondarySkillType[];
  setSelectedSecondarySkill: (
    newSecondarySkill: PokemonSecondarySkillType[]
  ) => void;
};

const PokemonSecondarySkill = ({
  secondarySkills,
  selectedSecondarySkill,
  setSelectedSecondarySkill,
}: Props) => {
  const skills_array: number[] = [10, 25, 50, 75, 100];
  const [selected, setSelected] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const handlePokemonClick = (
    secondary_skill: PokemonSecondarySkillType,
    index: number
  ) => {
    setSelected((preSelected) => {
      const newSelected = [...preSelected];
      newSelected[index] = true;
      return newSelected;
    });

    const newSelectedSecondarySkill = [...selectedSecondarySkill];
    newSelectedSecondarySkill[index] = secondary_skill;
    setSelectedSecondarySkill(newSelectedSecondarySkill);
  };

  return (
    <>
      {skills_array.map((skill_level, index) => (
        <div className="flex-start flex-col gap-1" key={index}>
          <span
            className={
              "bg-yellow-700 text-white py-1 px-2 rounded-full text-xs"
            }
          >
            Lv.{skill_level}
          </span>

          <DropdownMenu.Root key={"PokemonSecondarySkill"}>
            <DropdownMenu.Trigger>
              {selected[index] ? (
                <span
                  className={`${
                    selectedSecondarySkill[index].color == 2
                      ? "normal_skill"
                      : selectedSecondarySkill[index].color == 4
                      ? "silver_skill"
                      : "gold_skill"
                  }`}
                >
                  {selectedSecondarySkill[index].secondary_skill_name}
                </span>
              ) : (
                <div className="flex-center gap-1 bg-gray-200 rounded-xl py-1 px-2 min-w-[100px]">
                  <span className={"text-gray-700"}> - </span>
                </div>
              )}
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="flex-start flex-col z-50 bg-gray-200 p-2 gap-2 rounded-2xl shadow-xl"
                sideOffset={3}
              >
                <ScrollArea.Root className="w-full h-[400px] overflow-hidden rounded-2xl">
                  <ScrollArea.Viewport className="w-full h-full">
                    {secondarySkills.map((skill) => (
                      <DropdownMenu.Item
                        key={skill._id}
                        onClick={() => handlePokemonClick(skill, index)}
                      >
                        <div
                          className={`${
                            skill.color == 2
                              ? "normal_skill"
                              : skill.color == 4
                              ? "silver_skill"
                              : "gold_skill"
                          } mb-2`}
                        >
                          {skill.secondary_skill_name}
                        </div>
                      </DropdownMenu.Item>
                    ))}
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar
                    className="flex user-select-none touch-none transition-all"
                    orientation="vertical"
                  >
                    <ScrollArea.Thumb className="ScrollAreaThumb" />
                  </ScrollArea.Scrollbar>
                  <ScrollArea.Scrollbar
                    className="flex user-select-none touch-none transition-all"
                    orientation="horizontal"
                  >
                    <ScrollArea.Thumb className="ScrollAreaThumb" />
                  </ScrollArea.Scrollbar>
                  <ScrollArea.Corner className={"rounded-xl"} />
                </ScrollArea.Root>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      ))}
    </>
  );
};

export default PokemonSecondarySkill;
