"use client";

import Link from "next/link";
import { Tab } from "./Tabs";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NavItem = ({ tab }: { tab: Tab }) => {
  const isActive = usePathname() === tab.link;

  return (
    <Link
      passHref
      key={tab.index}
      href={tab.link}
      className={
        isActive
          ? "relative flex-center flex-col text-blue-600 mx-2 w-full h-full transition-colors"
          : "relative flex-center flex-col hover:text-blue-600 mx-2 w-full h-full transition-colors"
      }
    >
      <span className="text-sm sm:text-base">{tab.name}</span>
      {isActive ? (
        <motion.div
          className="h-[1px] w-full absolute bottom-[-1px] bg-gradient-to-r from-blue-600 to-cyan-600"
          layoutId="underline"
        />
      ) : null}
    </Link>
  );
};

export default NavItem;
