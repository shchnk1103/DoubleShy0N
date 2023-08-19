"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import Image from "next/image";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdCatchingPokemon } from "react-icons/md";
import { Pokemon } from "../../../types/Pokemon";

type Props = {
  pokemons: Pokemon[];
  isLoading: boolean[];
  setIsLoading: (newLoading: boolean[]) => void;
  currentPage: number;
  setCurrentPage: (newPage: number) => void;
  selectedPokemon: Pokemon;
  setSelectedPokemon: (newPokemon: Pokemon) => void;
};

const PokemonDropDown = ({
  pokemons,
  isLoading,
  setIsLoading,
  currentPage,
  setCurrentPage,
  selectedPokemon,
  setSelectedPokemon,
}: Props) => {
  const [selected, setSelected] = useState<boolean>(false);

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelected(true);
    setSelectedPokemon(pokemon);
  };

  const handleScroll = (event: any) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;

    if (scrollTop + clientHeight >= scrollHeight - 200) {
      if (!isLoading[0] && !isLoading[1]) {
        setIsLoading([true, false]);
        setCurrentPage(currentPage + 1);
      }
    }
  };

  return (
    <DropdownMenu.Root key={"Pokemons"}>
      <DropdownMenu.Trigger>
        <div
          className={
            "px-2 flex-center gap-4 bg-gray-200 rounded-2xl shadow-xl group"
          }
          aria-label="Pokemon options"
        >
          {selected ? (
            <div className="flex-center flex-row gap-2">
              <Image
                src={selectedPokemon.img_url}
                alt={selectedPokemon.id}
                width={"50"}
                height={"50"}
                className={"object-fill rounded-xl my-2 shadow-md"}
                loading="lazy"
              />

              <span className={"text-lg font-poppins"}>
                {selectedPokemon.name}
              </span>
            </div>
          ) : (
            <div className="flex-center flex-row gap-2">
              <div className="w-[50px] h-[50px] flex-center bg-gray-300 rounded-2xl my-2">
                <MdCatchingPokemon className="w-8 h-8" />
              </div>

              <span className="h-[50px] flex-center blue_gradient">
                请选择宝可梦
              </span>
            </div>
          )}

          <RxHamburgerMenu
            className={`w-6 h-6 p-1 text-gray-500 group-hover:bg-gray-500 group-hover:text-gray-300 group-hover:rounded-full transition-all`}
          />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="flex-start flex-col z-50 bg-gray-200 p-2 gap-2 rounded-2xl shadow-xl"
          sideOffset={3}
        >
          <ScrollArea.Root className="w-[194px] h-[400px] overflow-hidden rounded-2xl">
            <ScrollArea.Viewport
              className="w-full h-full"
              onScroll={handleScroll}
            >
              {pokemons.map((pokemon, index) => (
                <DropdownMenu.Item
                  className="flex justify-start items-center gap-3 bg-gray-300 px-2 mb-2 rounded-2xl cursor-pointer w-[194px] hover:bg-gray-400/60 transition-all"
                  key={index}
                  onClick={() => handlePokemonClick(pokemon)}
                >
                  <Image
                    src={pokemon.img_url}
                    alt={pokemon.id}
                    width={"50"}
                    height={"50"}
                    className={"object-fill rounded-xl my-4"}
                  />
                  <span className="flex-1">{pokemon.name}</span>
                  <MdCatchingPokemon className="w-6 h-6" />
                </DropdownMenu.Item>
              ))}

              {isLoading[0] && (
                <div className="w-full flex-center">
                  <MdCatchingPokemon className="w-6 h-6 animate-pulse" />
                </div>
              )}
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
  );
};

export default PokemonDropDown;
