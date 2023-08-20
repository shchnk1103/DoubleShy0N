"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MdCatchingPokemon } from "react-icons/md";
import { PokemonCharacterType } from "../../../types/Pokemon";

type Props = {
  characters: PokemonCharacterType[];
  selectedCharacter: PokemonCharacterType;
  setSelectedCharacter: (newCharacter: PokemonCharacterType) => void;
};

const PokemonCharacter = ({
  characters,
  selectedCharacter,
  setSelectedCharacter,
}: Props) => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleClick = (character: PokemonCharacterType) => {
    setSelected(true);
    setSelectedCharacter(character);
  };

  return (
    <div className="flex-start flex-col md:flex-row gap-4">
      <div className={"pokemon_card"}>
        <span className="text-sm md:text-base pointer-events-none">性格：</span>

        <DropdownMenu.Root key={"PokemonCharacter"}>
          <DropdownMenu.Trigger>
            {selected ? (
              <span
                className={
                  "bg-gray-300 dark:bg-gray-600 rounded-xl py-1 px-2 text-sm md:text-base"
                }
              >
                {selectedCharacter.title}
              </span>
            ) : (
              <div className="flex-center gap-1 bg-gray-300 dark:bg-gray-600 rounded-xl py-1 px-2">
                <span
                  className={
                    "text-gray-700 dark:text-gray-300 text-sm md:text-base"
                  }
                >
                  {" "}
                  -{" "}
                </span>

                <MdCatchingPokemon />
              </div>
            )}
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="flex-start flex-col z-50 bg-gray-200 dark:bg-gray-700 p-2 gap-2 rounded-2xl shadow-xl"
              sideOffset={3}
            >
              <ScrollArea.Root className="w-20 h-[400px] overflow-hidden rounded-2xl">
                <ScrollArea.Viewport className="w-full h-full">
                  {characters.map((character, index) => (
                    <DropdownMenu.Item
                      key={character._id}
                      onClick={() => handleClick(character)}
                    >
                      <div
                        className={
                          "p-2 rounded-2xl flex-center hover:bg-gray-400 dark:text-gray-300"
                        }
                      >
                        {character.title}
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
                <ScrollArea.Corner className="ScrollAreaCorner" />
              </ScrollArea.Root>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      <div className="flex-start flex-row gap-2">
        <div className={"pokemon_card min-w-[80px] pointer-events-none"}>
          <FaArrowUp className={"text-red-600"} />
          {selected ? (
            <span className="text-sm md:text-base">
              {selectedCharacter.plus}
            </span>
          ) : (
            <span> - </span>
          )}
        </div>

        <div className={"pokemon_card min-w-[80px] pointer-events-none"}>
          <FaArrowDown className="text-green-600" />
          {selected ? (
            <span className="text-sm md:text-base">
              {selectedCharacter.minus}
            </span>
          ) : (
            <span> - </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PokemonCharacter;
