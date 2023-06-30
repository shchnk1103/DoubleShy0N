import "@/styles/article.css";
import { motion } from "framer-motion";
import Image from "next/image";
import Date from "../Article/Date";
import Tag from "../Article/Tag";
import Count from "../Article/Count";
import { fadeIn } from "@/utils/motion";
import Link from "next/link";

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
  return (
    <Link
      href={`/articles/${article.slug}`}
      passHref
      className="w-full md:w-[90%] relative h-80 md:h-full shadow-md rounded-3xl cursor-pointer z-20 group hover:scale-105 transition-transform"
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
        />

        <div className="z-10 w-full h-24 backdrop-blur-2xl group-hover:backdrop-blur-lg backdrop-filter mt-auto rounded-b-3xl p-3 flex flex-col justify-center">
          <div className="w-full flex flex-col gap-2">
            <h2 className="font-semibold text-base md:text-xl inline-block text-zinc-500 dark:text-zinc-800">
              {article.title}
            </h2>

            <span className="flex items-center justify-between">
              <span className="inline-flex items-center justify-start space-x-3 w-full">
                <Date date={article.date} />

                <Tag tag={article.tag} />
              </span>

              <div className="inline-flex items-center justify-end space-x-3 flex-auto w-full">
                <Count count={article.count} />
              </div>
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ArticleCard;
