"use client";

import "@/styles/navbar.css";
import { tabs } from "./Tabs";
import Avatar from "./Avatar";
import DarkModeButton from "./DarkModeButton";
import NavItem from "./NavItem";
import Icon from "./Icon";
import { CSSProperties, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { clamp, removeProperty, setProperty } from "@/utils/functions";

const NavBar = () => {
  const isHomePage = usePathname() === "/";

  const navRef = useRef<HTMLDivElement>(null);
  const isInitial = useRef(true);

  useEffect(() => {
    const updateHeaderStyles = () => {
      if (!navRef.current) return;

      const { top } = navRef.current.getBoundingClientRect();

      const scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight
      );

      if (isInitial.current) {
        setProperty("--header-position", "sticky");
      }

      if (top === 0 && scrollY > 0 && scrollY >= 200) {
        removeProperty("--header-position");
      }
    };

    const updateStyles = () => {
      updateHeaderStyles();
      isInitial.current = false;
    };

    updateStyles();
    window.addEventListener("scroll", updateStyles, { passive: true });
    window.addEventListener("resize", updateStyles);

    return () => {
      window.removeEventListener("scroll", updateStyles);
      window.removeEventListener("resize", updateStyles);
    };
  }, [isHomePage]);

  return (
    <nav
      className="flex-between pt-4 mb-4 w-full mx-auto z-50 h-16 top-0"
      ref={navRef}
      style={{
        position: "var(--header-position)" as CSSProperties["position"],
      }}
    >
      {/* icon */}
      <div className="flex-1">
        <Icon />
      </div>

      {/* items */}
      <div className="flex flex-1 flex-row px-6 py-0 w-fit h-10 border dark:border-gray-500 rounded-full bg-gray-50 dark:bg-gray-800 shadow-md dark:shadow-gray-600/95 dark:text-gray-500">
        {tabs.map((tab) => (
          <NavItem tab={tab} key={tab.index} />
        ))}
      </div>

      <div className="flex-end gap-2 flex-1">
        <Avatar />

        <DarkModeButton />
      </div>
    </nav>
  );
};

export default NavBar;
