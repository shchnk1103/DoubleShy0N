"use client";

import React from "react";
import { motion } from "framer-motion";
import { quoteVariants, singleWordVariants } from "@/utils/motion";

type AnimatedTextProps = {
  text: string;
  className?: string;
};

const AnimatedText = ({ text, className = "" }: AnimatedTextProps) => {
  return (
    <div className="w-full h-full mx-auto flex-center text-center flex-col overflow-hidden pointer-events-none">
      <motion.h1
        className={`inline-block w-full blue_gradient font-semibold text-5xl mt-8 capitalize ${className}`}
        variants={quoteVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
      >
        {Array.from(text).map((word, index) => (
          <motion.span
            key={word + "-" + index}
            className="inline-block"
            variants={singleWordVariants}
          >
            {word === " " ? "\u00A0" : word}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

export default AnimatedText;
