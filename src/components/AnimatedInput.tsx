"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  inputName: string;
  type: string;
  input: string;
  setInput?: React.Dispatch<React.SetStateAction<string>>;
};

const AnimatedInput = ({
  inputName,
  type = "email",
  input,
  setInput,
}: Props) => {
  const [isClick, setIsClick] = useState(false);
  const [validError, setValidError] = useState(false);

  const handleBlur = () => {
    if (input.length === 0) {
      setIsClick(false);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (type === "email") {
      if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        setInput(value);
        setValidError(false);
      } else {
        setValidError(true);
      }
    } else if (type === "password") {
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i.test(value)) {
        setInput(value);
        setValidError(false);
      } else {
        setValidError(true);
      }
    } else if (type === "name") {
      if (
        /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i.test(
          value
        )
      ) {
        setInput(value);
        setValidError(false);
      } else {
        setValidError(true);
      }
    }
  };

  return (
    <motion.div
      initial={false}
      animate={isClick ? "active" : "inactive"}
      variants={{
        active: (i = 1) => ({
          transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
        }),
        inactive: (i = 1) => ({
          transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
        }),
      }}
      className="relative w-full"
    >
      <input
        type={type}
        className={`${
          validError
            ? "border-red-500 border-b-2"
            : "border-slate-800 dark:border-slate-300 border-b-[1px]"
        } bg-transparent focus:outline-none text-base block px-1 w-full transition-[border]`}
        onChange={handleOnChange}
        onFocus={() => setIsClick(true)}
        onBlur={handleBlur}
      />

      <span className="bar"></span>

      <motion.label className="absolute pointer-events-none left-1 top-0 flex">
        {Array.from(inputName).map((word, index) => (
          <motion.span
            key={index}
            variants={{
              active: {
                y: -20,
                transition: { type: "spring", duration: 0.35 },
                color: "rgb(96, 165, 250)",
              },
              inactive: { y: 0, color: "rgb(209, 213, 219)" },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.label>
    </motion.div>
  );
};

export default AnimatedInput;
