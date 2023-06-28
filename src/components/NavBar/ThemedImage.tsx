"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { BiSun, BiMoon } from "react-icons/bi";
import { FC, useEffect, useState } from "react";

const ThemedImage: FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { resolvedTheme } = useTheme();
  let src: string;

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  switch (resolvedTheme) {
    case "light":
      return <BiSun size={20} />;
    case "dark":
      return <BiMoon size={20} />;
    default:
      src = "/assets/icons/favicon.ico";
      break;
  }

  return <Image alt="isDarkMode" src={src} width={20} height={20} />;
};

export default ThemedImage;
