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
    <div className="flex-start flex-row gap-2">
      <div
        className={
          "bg-gray-200 rounded-2xl h-[66px] p-2 flex-center gap-2 shadow-xl transition-all"
        }
      >
        <span className="pointer-events-none">性格：</span>

        <DropdownMenu.Root key={"PokemonCharacter"}>
          <DropdownMenu.Trigger>
            {selected ? (
              <span className={"bg-gray-300 rounded-xl py-1 px-2"}>
                {selectedCharacter.title}
              </span>
            ) : (
              <div className="flex-center gap-1 bg-gray-300 rounded-xl py-1 px-2">
                <span className={"text-gray-700"}>请选择性格</span>

                <MdCatchingPokemon />
              </div>
            )}
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="flex-start flex-col z-50 bg-gray-200 p-2 gap-2 rounded-2xl shadow-xl"
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
                          "p-2 rounded-2xl flex-center hover:bg-gray-400"
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

      <div
        className={
          "flex-center gap-2 bg-gray-200 rounded-xl py-1 px-2 h-[66px] min-w-[80px] pointer-events-none"
        }
      >
        <FaArrowUp className={"text-red-600"} />
        {selected ? <span>{selectedCharacter.plus}</span> : <span> - </span>}
      </div>

      <div
        className={
          "flex-center gap-2 bg-gray-200 rounded-xl py-1 px-2 h-[66px] min-w-[80px] pointer-events-none"
        }
      >
        <FaArrowDown className="text-green-600" />
        {selected ? <span>{selectedCharacter.minus}</span> : <span> - </span>}
      </div>
    </div>
  );
};

export default PokemonCharacter;
