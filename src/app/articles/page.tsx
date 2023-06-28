"use client";

import AnimatedText from "@/components/AnimatedText";
import Card from "@/components/Article/Card";
import { useEffect, useState } from "react";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    const response = await fetch("/api/articles");
    const articlesData = await response.json();

    setArticles(articlesData);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      {articles.length !== 0 ? (
        <div className="flex-start flex-col w-full my-8 min-h-[400px]">
          {articles.map((article, index) => (
            <div key={index} className="w-full">
              <Card article={article} cardType={""} />
            </div>
          ))}
        </div>
      ) : (
        <AnimatedText
          text={"Loading..."}
          className="min-h-[400px] flex-center"
        />
      )}
    </>
  );
};

export default Articles;
