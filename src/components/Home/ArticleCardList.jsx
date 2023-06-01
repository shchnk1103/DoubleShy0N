"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { staggerContainer } from "@/utils/motion";
import { useRouter } from "next/navigation";

const ArticleCardList = () => {
  const router = useRouter();

  const [allArticles, setAllArticles] = useState([]);
  const [active, setActive] = useState(0);

  const fetchArticles = async () => {
    const response = await fetch("/api/articles/the-latest");
    const articles = await response.json();

    const latestArticles = articles.slice(-5);

    setAllArticles(latestArticles);

    if (latestArticles.length !== 0) {
      setActive(latestArticles[0]._id);
    }
  };

  const handleClick = (id) => {
    router.push(`/articles/${id}`);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <motion.div
      className="flex flex-col gap-4 h-full w-full"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      viewport={{ once: false, amount: 0.25 }}
    >
      <span className="font-semibold text-xl blue_gradient">
        The latest articles:
      </span>

      {allArticles.length !== 0 ? (
        <div className="flex flex-col gap-2 w-full h-full">
          {Array.from(allArticles).map((article, index) => (
            <ArticleCard
              key={article._id}
              article={{
                id: article._id,
                userId: article.creator,
                title: article.title,
                date: article.date,
                tag: article.tag,
                count: article.count,
                image: article.image,
              }}
              index={index}
              active={active}
              handleClick={() => handleClick && handleClick(article._id)}
              handleHover={setActive}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-[90%] h-full border rounded-3xl p-8 shadow-sm font-semibold text-lg backdrop-blur-md dark:text-zinc-300 dark:border-gray-500">
          <span>There are no articles at the moment,</span>
          <span>Please give me some time.</span>
        </div>
      )}
    </motion.div>
  );
};

export default ArticleCardList;
