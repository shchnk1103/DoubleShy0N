import { Variants } from "framer-motion";

type commonType = {
  [key: string]: string;
};

export const fadeIn = (direction: string, type, delay, duration) => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const navStaggerContainer = (staggerChildren, delayChildren) => ({
  hidden: {
    opacity: 0,
    y: -50,
    x: "-50%",
  },
  show: {
    opacity: 1,
    y: 0,
    x: "-50%",
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const quoteVariants = {
  hidden: {
    opacity: 0,
  },
  show: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
  }),
};

export const singleWordVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      ease: "easeIn",
    },
  },
};
