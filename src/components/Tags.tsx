"use client";

import { useEffect, useState } from "react";
import { quoteVariants, singleWordVariants } from "@/utils/motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { getCategories } from "../../sanity/utils";
import { Category } from "../../types/Category";

const Tags = () => {
  const [tags, setTags] = useState<Category[]>([]);

  const fetchTags = async () => {
    const data = await getCategories();

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
      {Array.from(tags).map((tag) => (
        <Link href={`/articles/tags/${tag.title}`} key={tag._id} passHref>
          <motion.span
            variants={singleWordVariants}
            className={`border px-3 py-1 rounded-full hover:bg-blue-600 hover:text-slate-100 transition-colors cursor-pointer inline-block capitalize mr-2 mb-2 bg-transparent text-slate-500 border-gray-300 dark:shadow-gray-600/95 dark:border-gray-500 dark:hover:text-slate-300 dark:hover:border-gray-600`}
          >
            {tag.title}
          </motion.span>
        </Link>
      ))}
    </motion.div>
  );
};

export default Tags;
