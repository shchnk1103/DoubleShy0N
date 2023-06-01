import Author from "@/components/Article/Author";
import Count from "@/components/Article/Count";
import Date from "@/components/Article/Date";
import Tag from "@/components/Article/Tag";
import Image from "next/image";
import { BsArrowRightCircle } from "react-icons/bs";
import { useRouter } from "next/navigation";

const Card = ({ article, cardType }) => {
  const router = useRouter();

  return (
    <>
      {article && (
        <div className="w-full flex flex-between gap-4 border dark:border-gray-500 py-8 px-8 rounded-3xl backdrop-blur-sm shadow-md dark:shadow-gray-600/95">
          <div className="flex-start justify-center items-center w-full gap-8">
            <Image
              src={article.image}
              alt="article_img"
              width={200}
              height={200}
              className="rounded-xl object-cover w-[200px] min-h-[100px] h-full shadow-md dark:shadow-gray-600/95 hidden md:block"
            />

            <div className="flex-start gap-2 flex-col w-full">
              <h1 className="blue_gradient font-bold text-3xl md:text-2xl">
                {article.title}
              </h1>

              <div className="flex-start gap-2">
                {cardType !== "tag" && (
                  <Author author={article.creator.username} />
                )}

                <Date date={article.date} />

                <Tag tag={article.tag} />

                <Count count={article.count} />
              </div>

              <p className="text-gray-500">{article.content}</p>
            </div>
          </div>

          <BsArrowRightCircle
            className="h-8 w-8 text-gray-300 hover:text-gray-500 cursor-pointer transition-colors dark:text-gray-500 dark:hover:text-gray-400"
            onClick={() => {
              router.push(`articles/${article._id}`);
            }}
          />
        </div>
      )}
    </>
  );
};

export default Card;
