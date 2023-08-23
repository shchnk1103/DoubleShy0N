"use client";

import { temporaryScore } from "@/utils/pokemon";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import React, { useState } from "react";

type Props = {
  selectedTemporary: [string, number][];
  setSelectedTemporary: (newTemporary: [string, number][]) => void;
};

const PokemonTemporary = ({
  selectedTemporary,
  setSelectedTemporary,
}: Props) => {
  const [selected, setSelected] = useState<boolean[]>([false, false]);

  const handleClickOfFruit = (value: [string, number]) => {
    setSelected([true, selected[1]]);
    setSelectedTemporary([value, selectedTemporary[1]]);
  };

  const handleClickOfFood = (value: [string, number]) => {
    setSelected([selected[0], true]);
    setSelectedTemporary([selectedTemporary[0], value]);
  };

  return (
    <div className="flex-start md:flex-row flex-col gap-4">
      <div className="pokemon_card py-1 px-2 min-w-[100px]">
        <span>树果是否爱吃：</span>
        <DropdownMenu.Root key={"PokemonSecondarySkill"}>
          <DropdownMenu.Trigger>
            {selected[0] ? (
              <span
                className={`text-sm md:text-base bg-gray-300 dark:bg-gray-600 px-2 py-1 rounded-xl`}
              >
                {selectedTemporary[0][0]}
              </span>
            ) : (
              <div className="pokemon_card !px-5 !h-[30px] !bg-gray-300 dark:!bg-gray-600">
                <span className={"text-gray-700 dark:text-gray-300"}> - </span>
              </div>
            )}
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="flex-start flex-col z-50 bg-gray-200 dark:bg-gray-700 p-2 gap-2 rounded-2xl shadow-xl"
              sideOffset={3}
            >
              <ScrollArea.Root className="w-full h-fit overflow-hidden rounded-xl">
                <ScrollArea.Viewport className="w-full h-full">
                  {Object.entries(temporaryScore["树果"]).map((value, key) => (
                    <DropdownMenu.Item
                      key={key}
                      onClick={() => handleClickOfFruit(value)}
                      className="flex-center flex-row h-full w-full hover:bg-gray-400 rounded-2xl"
                    >
                      <div
                        className={`flex-center text-center w-full lg:text-base text-sm text-gray-700 dark:text-gray-300 p-1 pointer-events-none`}
                      >
                        {value[0]}
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
                <ScrollArea.Corner className={"rounded-lg"} />
              </ScrollArea.Root>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      <div className="pokemon_card py-1 px-2 min-w-[100px]">
        <span>食材是否重要：</span>
        <DropdownMenu.Root key={"PokemonSecondarySkill"}>
          <DropdownMenu.Trigger>
            {selected[1] ? (
              <span
                className={`text-sm md:text-base bg-gray-300 dark:bg-gray-600 px-2 py-1 rounded-xl`}
              >
                {selectedTemporary[1][0]}
              </span>
            ) : (
              <div className="pokemon_card !px-5 !h-[30px] !bg-gray-300 dark:!bg-gray-600">
                <span className={"text-gray-700 dark:text-gray-300"}> - </span>
              </div>
            )}
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="flex-start flex-col z-50 bg-gray-200 dark:bg-gray-700 p-2 gap-2 rounded-2xl shadow-xl"
              sideOffset={3}
            >
              <ScrollArea.Root className="w-full h-fit overflow-hidden rounded-xl">
                <ScrollArea.Viewport className="w-full h-full">
                  {Object.entries(temporaryScore["食材"]).map((value, key) => (
                    <DropdownMenu.Item
                      key={key}
                      onClick={() => handleClickOfFood(value)}
                      className="flex-center flex-row h-full w-full hover:bg-gray-400 rounded-2xl"
                    >
                      <div
                        className={`flex-center text-center w-full lg:text-base text-sm text-gray-700 dark:text-gray-300 p-1 pointer-events-none`}
                      >
                        {value[0]}
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
                <ScrollArea.Corner className={"rounded-lg"} />
              </ScrollArea.Root>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};

export default PokemonTemporary;
