import { useTranslations } from "next-intl";
import Tags from "@/components/Tags";
import ArticleList from "@/components/Article/ArticleList";

const Articles = () => {
  const t = useTranslations("Home");

  return (
    <>
      <div className="w-full flex-start flex-col gap-3 padding">
        <div className="flex-start w-full my-2 md:my-8">
          <span className="mr-4 my-1 blue_gradient font-semibold text-base md:text-2xl whitespace-nowrap">
            {t("tags")}
          </span>

          <Tags />
        </div>

        <ArticleList />
      </div>
    </>
  );
};

export default Articles;
