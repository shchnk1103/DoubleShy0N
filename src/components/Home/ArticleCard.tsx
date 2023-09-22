import "@/styles/article.css";
import { motion } from "framer-motion";
import Image from "next/image";
import Date from "../Article/Date";
import Tag from "../Article/Tag";
import Count from "../Article/Count";
import { fadeIn } from "@/utils/motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCount } from "@/utils/api_func";

type ArticleCardProps = {
  article: article;
  index: number;
  handleHover: (id: string) => void;
};

type article = {
  id: string;
  name: string;
  slug: string;
  title: string;
  date: Date;
  tag: string;
  count: number;
  image: string;
};

const ArticleCard = ({ article, index }: ArticleCardProps) => {
  const [count, setCount] = useState(0);

  const handleCountClick = async () => {
    try {
      const response = await fetch(`/api/articles/add/${article.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: article.id }),
      });

      if (response.ok) {
        setCount(count + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCount(article.id).then((result) => {
      setCount(result);
    });
  }, [count]);

  return (
    <Link
      href={`/articles/${article.slug}`}
      passHref
      className="w-full md:w-[90%] relative h-60 md:h-80 shadow-md rounded-3xl cursor-pointer z-20 group hover:scale-105 transition-transform"
      onClick={() => handleCountClick()}
    >
      <motion.div
        variants={fadeIn("down", "spring", index * 0.5, 0.75)}
        className="flex-end h-full relative"
      >
        <Image
          alt="article_image"
          src={article.image}
          fill
          className="inset-0 w-full h-full rounded-3xl object-cover -z-10"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          loading="lazy"
        />

        <div className="z-10 w-full h-24 bg-gradient-to-b from-gray-50 dark:from-gray-600 to-white dark:to-gray-800 opacity-90 backdrop-blur-xl backdrop-filter dark:bg-gray-900 group-hover:opacity-60 transition-opacity mt-auto rounded-b-3xl p-3 flex flex-col justify-center">
          <div className="w-full flex flex-col gap-2">
            <h2 className="font-semibold text-base md:text-xl inline-block text-zinc-400 dark:text-zinc-200">
              {article.title}
            </h2>

            <span className="flex items-center justify-between">
              <span className="inline-flex items-center justify-start space-x-3 w-full">
                <Date date={article.date} />

                <Tag tag={article.tag} />
              </span>

              <div className="inline-flex items-center justify-end space-x-3 flex-auto w-full">
                <Count count={count} />
              </div>
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ArticleCard;
