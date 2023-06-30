"use client";

import AnimatedText from "@/components/AnimatedText";
import Card from "@/components/Article/Card";
import { useEffect, useState } from "react";
import { getArticlesByCategory } from "../../../../../sanity/utils";
import { Article } from "../../../../../types/Article";

type ArticleByTagProps = {
  params: {
    slug: string;
  };
};

const ArticleByTag = ({ params }: ArticleByTagProps) => {
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchArticlesByTag = async (slug: string) => {
    const data = await getArticlesByCategory(slug);

    setArticles(data);
  };

  useEffect(() => {
    fetchArticlesByTag(params.slug);
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
