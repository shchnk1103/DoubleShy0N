"use client";

import { quoteVariants, singleWordVariants } from "@/utils/motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const Tags = () => {
  const [tags, setTags] = useState([]);

  const fetchTags = async () => {
    const response = await fetch("/api/tags");
    const data = await response.json();
    setTags(data);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <motion.div
      className="w-full inline-block mt-2"
      variants={quoteVariants}
      initial="hidden"
      animate="show"
      viewport={{ once: false, amount: 0.25 }}
    >
      {Array.from(tags).map((tag, index) => (
        <motion.span
          key={tag._id + index}
          variants={singleWordVariants}
          className={`border px-3 py-1 rounded-full hover:bg-blue-600 hover:text-slate-100 transition-colors cursor-pointer inline-block capitalize mr-2 mb-2 bg-transparent text-slate-500 border-gray-300 dark:shadow-gray-600/95 dark:border-gray-500 dark:hover:text-slate-300 dark:hover:border-gray-600`}
        >
          <Link href={`/articles/tags/${tag.name}`}>{tag.name}</Link>
        </motion.span>
      ))}
    </motion.div>
  );
};

export default Tags;
