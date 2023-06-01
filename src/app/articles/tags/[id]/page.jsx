"use client";

import AnimatedText from "@/components/AnimatedText";
import Card from "@/components/Article/Card";
import { useEffect, useState } from "react";

const ArticleByTag = ({ params }) => {
  const [articles, setArticles] = useState([]);

  const fetchArticlesByTag = async (id) => {
    const response = await fetch(`/api/articles/by-tag/${id}`);
    const data = await response.json();

    setArticles(data);
  };

  useEffect(() => {
    fetchArticlesByTag(params.id);
  }, []);

  return (
    <>
      {articles.length !== 0 ? (
        <div className="flex-start flex-col w-full my-8 min-h-[400px]">
          {articles.map((article, index) => (
            <div key={index}>
              <Card article={article} cardType={"tag"} />
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

export default ArticleByTag;
