import "@/styles/article.css";
import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Date from "../Article/Date";
import Tag from "../Article/Tag";
import Count from "../Article/Count";

const ArticleCard = ({
  article,
  index,
  active,
  handleClick,
  handleHover,
  handleDelete,
}) => {
  return (
    <>
      <motion.div
        variants={fadeIn("down", "spring", index * 0.5, 0.75)}
        className={`article_card_bg ${
          active === article.id ? "flex-[10] min-h-[200px]" : "flex-[1]"
        } transition-[flex] w-full md:w-[90%]`}
        onClick={handleClick}
        onMouseEnter={() => handleHover(article.id)}
      >
        <Image
          alt="article_image"
          src={article.image}
          width={200}
          height={200}
          className="absolute inset-0 w-full h-full rounded-3xl object-cover"
          sizes="100vw"
        />

        <div className="z-10 flex w-full flex-col gap-2">
          <h2 className="font-semibold text-base md:text-xl inline-block text-zinc-50">
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
      </motion.div>
    </>
  );
};

export default ArticleCard;
