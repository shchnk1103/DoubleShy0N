"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ArticleCard from "./ArticleCard";
import { staggerContainer } from "@/utils/motion";
import { getAllArticles } from "../../../sanity/utils";
import { Article } from "../../../types/Article";
import { useTranslations } from "next-intl";

const ArticleCardList = ({ data }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const articles = await getAllArticles();

      return articles.slice(0, 5);
    };

    fetchArticles().then((result) => {
      setArticles(result);
    });
  }, []);

  return (
    <motion.div
      className="flex flex-col gap-4 h-full w-full"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      viewport={{ once: false, amount: 0.25 }}
    >
      <span className="font-semibold text-xl blue_gradient">{data.title}</span>

      {articles.length !== 0 ? (
        <div className="flex flex-col gap-3 w-full h-full">
          {Array.from(articles).map((article, index) => (
            <ArticleCard
              key={article._id}
              article={{
                id: article._id,
                name: article.author.name,
                slug: article.slug,
                title: article.title,
                date: article._createdAt,
                tag: article.categories.title,
                count: article.count,
                image: article.mainImage,
              }}
              index={index}
              handleHover={() => {}}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-[90%] h-full border rounded-3xl p-8 shadow-sm font-semibold text-lg backdrop-blur-md dark:text-zinc-300 dark:border-gray-500">
          <span>{data.tip_1}</span>
          <span>{data.tip_2}</span>
        </div>
      )}
    </motion.div>
  );
};

export default ArticleCardList;
