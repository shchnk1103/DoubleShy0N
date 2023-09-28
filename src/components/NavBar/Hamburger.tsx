"use client";

import { AnimatePresence, motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const Hamburger = () => {
  const { data: session } = useSession();
  type item = {
    name: string;
    href: string;
  };
  const items: item[] = [
    { name: "Pokemon Sleep", href: "/tools/pokemon-sleep" },
  ];

  const [clicked, setClicked] = useState<boolean>(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <div
        className="w-9 h-9 bg-white rounded-full shadow-md flex-center z-50 relative"
        onClick={handleClick}
      >
        <div
          className={`${
            clicked ? "translate-x-[3px]" : ""
          } w-5 relative h-4 flex justify-between items-center flex-col`}
        >
          <div
            className={`${
              clicked
                ? "block left-0 rotate-45 translate-y-full origin-top-left"
                : ""
            } h-[1px] w-full bg-black flex transition rounded-full`}
          ></div>
          <div
            className={`${
              clicked ? "w-0" : "w-full"
            } h-[1px] bg-black flex transition rounded-full`}
          ></div>
          <div
            className={`${
              clicked ? "block left-0 -rotate-45 origin-bottom-left" : ""
            } h-[1px] w-full bg-black flex transition rounded-full`}
          ></div>
        </div>

        <AnimatePresence>
          {clicked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-11 right-0 bg-white rounded-lg shadow-xl"
            >
              {session?.user ? (
                <div className="px-2 py-1 flex items-end !justify-end flex-col gap-1">
                  <span className="overflow-hidden w-full whitespace-nowrap blue_gradient">
                    {session.user.name}
                  </span>

                  {items.map((item, index) => (
                    <Link
                      href={item.href}
                      key={index}
                      className="whitespace-nowrap"
                    >
                      {item.name}
                    </Link>
                  ))}

                  <span className="text-red-700" onClick={() => signOut()}>
                    Sign Out
                  </span>
                </div>
              ) : (
                <div className="px-2 py-1" onClick={() => signIn()}>
                  <span>Login</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {clicked && (
        <div
          className="h-screen w-screen absolute top-0 left-0"
          onClick={handleClick}
        ></div>
      )}
    </>
  );
};

export default Hamburger;
