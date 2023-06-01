import * as HoverCard from "@radix-ui/react-hover-card";
import { useTheme } from "next-themes";
import ThemedImage from "./ThemedImage";

const DarkModeButton = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <button
          className="bg-gray-50 dark:bg-gray-800 shadow-md dark:shadow-gray-600/95 border dark:border-gray-500 h-10 w-10 rounded-full flex-center transition-colors dark:hover:border-gray-400"
          onClick={() =>
            theme == "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          <ThemedImage />
        </button>
      </HoverCard.Trigger>

      <HoverCard.Portal>
        <HoverCard.Content sideOffset={10}>
          <span className="z-50 px-2 py-1 rounded-lg dark:bg-gray-900/80 backdrop-blur-sm border dark:border-gray-500 shadow-sm dark:text-gray-400">
            {currentTheme === "light" ? "Light Mode" : "Dark Mode"}
          </span>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export default DarkModeButton;
