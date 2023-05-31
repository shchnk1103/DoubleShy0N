"use client";

import "@/styles/navbar.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Avatar from "./Avatar";
import DarkModeButton from "./DarkModeButton";

const tabs = [
  { index: 0, name: "Home", link: "/" },
  { index: 1, name: "Articles", link: "/articles" },
  { index: 2, name: "About", link: "/user" },
];

const NavBar = () => {
  const [activeItem, setActiveItem] = useState("Home");

  const clickItem = (item, index) => {
    setActiveItem(item);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="flex-between pt-4 mb-4 w-full mx-auto relative"
    >
      {/* icon */}
      <motion.div
        initial={{ opacity: "0%", rotate: "0deg" }}
        animate={{ opacity: "100%", rotate: "360deg" }}
        transition={{ duration: 0.25 }}
        whileHover={{ scale: 1.1, rotate: "180deg" }}
      >
        <Image
          alt="logo"
          src="/assets/icons/favicon.ico"
          width={36}
          height={36}
          className="rounded-full shadow-md"
          priority={true}
        />
      </motion.div>

      {/* items */}
      <div className="flex flex-row px-6 py-0 absolute left-1/2 -translate-x-1/2 w-fit h-10 border dark:border-gray-500 rounded-full bg-gray-50 dark:bg-gray-800 shadow-md dark:shadow-gray-600/95 dark:text-gray-500">
        {tabs.map((tab) => (
          <Link
            key={tab.index}
            href={tab.link}
            className={
              activeItem == tab.name
                ? "relative flex-center flex-col text-blue-600 mx-2 w-full h-full transition-colors"
                : "relative flex-center flex-col hover:text-blue-600 mx-2 w-full h-full transition-colors"
            }
            onClick={() => clickItem(tab.name, tab.index)}
          >
            {tab.name}
            {tab.name === activeItem ? (
              <motion.div
                className="h-[1px] w-full absolute bottom-[-1px] bg-gradient-to-r from-blue-600 to-cyan-600"
                layoutId="underline"
              />
            ) : null}
          </Link>
        ))}
      </div>

      <div className="flex-center gap-2">
        <Avatar />

        <DarkModeButton />
      </div>
    </motion.nav>
  );
};

export default NavBar;
