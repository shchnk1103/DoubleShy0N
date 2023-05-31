"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

const HomeImage = () => {
  return (
    <motion.img
      src="/assets/images/developer-pic-1.png"
      alt="home-pic"
      variants={fadeIn("right", "spring", 0.25, 0.5)}
      initial="hidden"
      whileInView="show"
    />
  );
};

export default HomeImage;
