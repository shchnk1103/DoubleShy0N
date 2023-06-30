"use client";

import AnimatedText from "@/components/AnimatedText";
import Card from "@/components/Article/Card";
import { useEffect, useState } from "react";
import { getArticles } from "../../../sanity/utils";
import { Article } from "../../../types/Article";
import ArticleCard from "@/components/Home/ArticleCard";

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchArticles = async () => {
    const data = await getArticles();

    setArticles(data);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      {articles.length !== 0 ? (
        <div className="w-full my-8 min-h-[70vh] grid grid-cols-2">
          {articles.map((article, index) => (
            <div key={index} className="w-full h-96 shadow-md rounded-3xl">
              <ArticleCard
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
            </div>
          ))}
        </div>
      ) : (
        <AnimatedText
          text={"Loading..."}
          className="min-h-[70vh] flex-center"
        />
      )}
    </>
  );
};

export default Articles;
