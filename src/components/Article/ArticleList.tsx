"use client";

import React, { useEffect, useState } from "react";
import { getAllArticles } from "../../../sanity/utils";
import { Article } from "../../../types/Article";
import ArticleCard from "../Home/ArticleCard";
import AnimatedText from "../AnimatedText";

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getAllArticles();

      setArticles(data);
    };

    fetchArticles();
  }, []);
  return (
    <>
      {articles.length !== 0 ? (
        <div className="w-full min-h-[70vh] grid grid-cols-1 md:grid-cols-2 gap-3">
          {articles.map((article: Article, index: number) => (
            <div
              key={index}
              className="w-full h-64 md:h-96 shadow-md rounded-3xl"
            >
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

export default ArticleList;
