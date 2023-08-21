"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Icon = () => {
  return (
    <motion.div
      initial={{ opacity: "0%", rotate: "0deg" }}
      animate={{ opacity: "100%", rotate: "360deg" }}
      transition={{ duration: 0.25 }}
      whileHover={{ scale: 1.1, rotate: "180deg" }}
      className="w-fit"
    >
      <Image
        alt="logo"
        src="/assets/icons/icon.jpg"
        width={36}
        height={36}
        className="rounded-full shadow-md"
        priority={true}
      />
    </motion.div>
  );
};

export default Icon;
