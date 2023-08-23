import React, { useState } from "react";
import * as HoverCard from "@radix-ui/react-hover-card";

const PokemonTip = () => {
  const [isHoverCardOpen, setIsHoverCardOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsHoverCardOpen(!isHoverCardOpen);
  };

  return (
    <HoverCard.Root open={isHoverCardOpen}>
      <HoverCard.Trigger asChild>
        <div
          className="bg-blue-300 rounded-full h-4 w-4 text-white flex-center cursor-pointer"
          onClick={handleClick}
          onMouseLeave={handleClick}
        >
          <span className="text-xs pointer-events-none">!</span>
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className="z-[999]" sideOffset={5}>
          <div className="bg-gray-200/80 rounded-2xl px-2 py-1">
            <span className="blue_gradient">
              此行是用于计算每一周临时的加分
            </span>
          </div>

          <HoverCard.Arrow className="fill-blue-300" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export default PokemonTip;
