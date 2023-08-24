"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import Image from "next/image";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdCatchingPokemon } from "react-icons/md";
import { Pokemon } from "../../../../types/Pokemon";
import { BsSearch } from "react-icons/bs";
import { fetchPokemonByName } from "@/utils/pokemon";

type Props = {
  pokemons: Pokemon[];
  isLoading: boolean[];
  setIsLoading: (newLoading: boolean[]) => void;
  currentPage: number;
  setCurrentPage: (newPage: number) => void;
  selectedPokemon: Pokemon;
  setSelectedPokemon: (newPokemon: Pokemon) => void;
  selected: boolean;
  setSelected: (newSelected: boolean) => void;
};

const PokemonDropDown = ({
  pokemons,
  isLoading,
  setIsLoading,
  currentPage,
  setCurrentPage,
  selectedPokemon,
  setSelectedPokemon,
  selected,
  setSelected,
}: Props) => {
  const [searchPokemons, setSearchPokemons] = useState<Pokemon[]>([]); // 搜索结果

  let typingTimeout: ReturnType<typeof setTimeout>;
  const displayPokemons =
    searchPokemons.length === 0 ? pokemons : searchPokemons;

  const renderedPokemonItem = (pokemon: Pokemon, index: number) => (
    <DropdownMenu.Item
      className="flex justify-start items-center gap-3 bg-gray-300 dark:bg-gray-800 px-2 mb-2 rounded-2xl cursor-pointer w-[194px] hover:bg-gray-400/60 dark:hover:bg-gray-800/60 transition-all"
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
  );

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

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value === "") return;

    clearTimeout(typingTimeout); // 清除之前的延迟函数
    typingTimeout = setTimeout(() => {
      // 延迟执行搜索
      fetchPokemonByName(value).then((res) => {
        console.log(res);
        if (res) {
          setSearchPokemons(res);
        }
      });
    }, 1000);
  };

  return (
    <DropdownMenu.Root key={"Pokemons"}>
      <DropdownMenu.Trigger>
        <div
          className={"pokemon_card group min-w-[160px]"}
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

              <span
                className={
                  "text-sm md:text-base font-poppins w-fit whitespace-nowrap"
                }
              >
                {selectedPokemon.name}
              </span>
            </div>
          ) : (
            <div className="flex-center flex-row gap-2">
              <div className="min-w-[50px] min-h-[50px] flex-center bg-gray-300 dark:bg-gray-600 rounded-2xl my-2">
                <MdCatchingPokemon className="w-8 h-8" />
              </div>

              <span className="h-[50px] flex-center blue_gradient text-sm md:text-base">
                宝可梦
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
          className="flex-start flex-col z-50 bg-gray-200 dark:bg-gray-700 p-2 gap-2 rounded-2xl shadow-xl"
          sideOffset={3}
        >
          <ScrollArea.Root className="w-[194px] h-[400px] overflow-hidden rounded-2xl">
            <ScrollArea.Viewport
              className="w-full h-full"
              onScroll={handleScroll}
            >
              {/* 搜索栏 */}
              <div className="w-full h-8 rounded-xl my-2 shadow-sm flex-center gap-2 bg-gray-100 dark:bg-gray-500">
                <BsSearch className="h-5 w-5 mx-2 text-gray-600 dark:text-gray-300" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-full bg-transparent text-blue-500 dark:text-blue-300 outline-none"
                  onChange={onChange}
                />
              </div>

              {displayPokemons.map(renderedPokemonItem)}

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
