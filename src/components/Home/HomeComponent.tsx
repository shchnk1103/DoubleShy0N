"use client";

import { motion } from "framer-motion";
import HomeImage from "./HomeImage";
import { FiGithub, FiTwitter, FiInstagram } from "react-icons/fi";
import { SiBilibili } from "react-icons/si";
import Link from "next/link";

const HomeComponent = () => {
  return (
    <div className="flex-center md:flex-between flex-col md:flex-row w-full h-full min-h-[80vh] gap-6 padding">
      <HomeImage />

      <div className="flex justify-start items-start flex-col w-full md:w-1/2">
        <motion.span
          initial={{ opacity: 0, offset: 20 }}
          animate={{
            opacity: 1,
            offset: 0,
            transition: {
              type: "tween",
              ease: "easeIn",
            },
          }}
          className="w-full h-auto mx-auto flex-start flex-col overflow-hidden pointer-events-none blue_gradient inline-block font-semibold text-5xl mt-8 capitalize text-left"
        >
          Welcome to my site!
        </motion.span>

        <span className="text-base text-left my-8 overflow-hidden pointer-events-none">
          My name is{" "}
          <span className="blue_gradient font-semibold">DoubleShy0N</span>, I am
          a full-stack developer, I like to share my experience and my thoughts
          on this site. I hope you can find what you want here. If I have any
          mistakes, please contact me. Thank you!
        </span>

        <div className="flex justify-start items-center flex-row mt-4 gap-4">
          <a
            href="mailto:doubleshy0n@qq.com"
            className="capitalize bg_blue_gradient text-slate-100 text-xl px-8 py-3 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition active:scale-95"
          >
            Contact
          </a>

          <Link href="https://github.com/shchnk1103">
            <FiGithub className="hover:scale-105 transition-transform" />
          </Link>

          <Link href="https://twitter.com/n_shy0">
            <FiTwitter className="hover:scale-105 transition-transform" />
          </Link>

          <Link href="https://www.instagram.com/doubleshy0n/">
            <FiInstagram className="hover:scale-105 transition-transform" />
          </Link>

          <Link href="https://space.bilibili.com/22571087?spm_id_from=333.1007.0.0">
            <SiBilibili />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
