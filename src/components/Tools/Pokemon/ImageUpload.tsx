import {
  fetchCharactersByTitle,
  fetchPokemonByName,
  fetchSecondarySkillsByName,
  uploadImage,
} from "@/utils/pokemon";
import Image from "next/image";
import React, { useState } from "react";
import {
  Pokemon,
  PokemonCharacterType,
  PokemonSecondarySkillType,
} from "../../../../types/Pokemon";

type Props = {
  setSelectedPokemon: (newPokemon: Pokemon) => void;
  setSelectedCharacter: (newCharacter: PokemonCharacterType) => void;
  setSelectedSecondarySkill: (
    newSecondarySkill: PokemonSecondarySkillType[]
  ) => void;
  setIsSelectedPokemon: (newIsSelectedPokemon: boolean) => void;
  setIsSelectedCharacter: (newIsSelectedCharacter: boolean) => void;
  setIsSelectedSecondarySkills: React.Dispatch<
    React.SetStateAction<PokemonSecondarySkillType[]>
  >;
};

const ImageUpload = ({
  setSelectedPokemon,
  setSelectedCharacter,
  setSelectedSecondarySkill,
  setIsSelectedPokemon,
  setIsSelectedCharacter,
  setIsSelectedSecondarySkills,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      // OCR
      try {
        const response = await uploadImage(file);
        const responseData = await response.json();

        // Pokemon
        const pokemon = await fetchPokemonByName(responseData.pokemon_name);
        if (pokemon[0]) {
          setSelectedPokemon(pokemon[0]);
          setIsSelectedPokemon(true);
        }

        // Character
        const character: PokemonCharacterType = await fetchCharactersByTitle(
          responseData.pokemon_character
        );
        if (character[0]) {
          setSelectedCharacter(character[0]);
          setIsSelectedCharacter(true);
        }

        // Secondary Skill
        for (let i = 0; i < responseData.pokemon_secondary_skills.length; i++) {
          const secondary_skill: PokemonSecondarySkillType =
            await fetchSecondarySkillsByName(
              responseData.pokemon_secondary_skills[i]
            );

          if (secondary_skill[0]) {
            setSelectedSecondarySkill((preSelectedSecondarySkill) => {
              const newSelectedSecondarySkill = [...preSelectedSecondarySkill];
              newSelectedSecondarySkill[i] = secondary_skill[0];
              return newSelectedSecondarySkill;
            });
          }
        }
        setIsSelectedSecondarySkills([true, true, true, true, true]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full lg:w-1/3 md:py-2 h-full lg:h-[468px] filter backdrop-blur-3xl rounded-2xl shadow-xl border-[1px] border-dashed flex-center flex-col gap-4 md:gap-6">
      {selectedImage ? (
        <Image
          src={selectedImage}
          width={200}
          height={200}
          alt="upload-image"
          className="w-full h-full rounded-2xl object-contain"
        />
      ) : (
        <label
          htmlFor="file"
          className="cursor-pointer w-full h-full flex-center flex-col gap-4 py-2 md:py-0"
        >
          <div className="flex-center">
            <ImageSVG />
          </div>

          <div className="flex-center">
            <span className="font-normal text-gray-500">Upload Image</span>
          </div>

          <input
            type="file"
            id="file"
            accept="image/*"
            className="hidden"
            onChange={handleInputChange}
          />
        </label>
      )}
    </div>
  );
};

const ImageSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill=""
      viewBox="0 0 24 24"
      className="h-20 fill-gray-500"
    >
      <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
      <g
        strokeLinejoin="round"
        strokeLinecap="round"
        id="SVGRepo_tracerCarrier"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          fill=""
          d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
          clipRule="evenodd"
          fillRule="evenodd"
        ></path>{" "}
      </g>
    </svg>
  );
};

export default ImageUpload;
