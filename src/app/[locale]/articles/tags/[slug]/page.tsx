"use client";

import AnimatedText from "@/components/AnimatedText";
import Card from "@/components/Article/Card";
import { useEffect, useState } from "react";
import { getArticlesByCategory } from "../../../../../../sanity/utils";
import { Article } from "../../../../../../types/Article";
import ArticleCard from "@/components/Home/ArticleCard";
import Tags from "@/components/Tags";

type ArticleByTagProps = {
  params: {
    slug: string;
  };
};

const ArticleByTag = ({ params }: ArticleByTagProps) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticlesByTag = async (slug: string) => {
      const data = await getArticlesByCategory(slug);

      setArticles(data);
    };

    fetchArticlesByTag(params.slug);
  }, []);

  return (
    <>
      {articles.length !== 0 ? (
        <div className="w-full min-h-[70vh] grid grid-cols-1 md:grid-cols-2 gap-3">
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
          className="min-h-[400px] flex-center"
        />
      )}
    </>
  );
};

export default ArticleByTag;
