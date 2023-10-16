import { useTranslations } from "next-intl";
import Tags from "../Tags";

const SideBar = () => {
  const t = useTranslations("Home");

  return (
    <div className="sticky top-20 flex justify-end items-end flex-col my-[46px] h-fit w-full gap-8">
      <div className="p-4 flex flex-col justify-end items-start gap-3 border rounded-2xl shadow overflow-hidden backdrop-blur-md w-full dark:shadow-gray-600/95 dark:border-gray-500">
        <div className="flex flex-col gap-1">
          <span className="blue_gradient font-semibold">{t("tags")}</span>
          <span className="inline-block text-slate-400">{t("tip_tag")}</span>
        </div>

        <Tags />
      </div>

      <div className="p-4 flex flex-col gap-3 border rounded-2xl shadow overflow-hidden backdrop-blur-md dark:shadow-gray-600/95 dark:border-gray-500">
        <span className="blue_gradient font-semibold pointer-events-none">
          {t("more")}
        </span>
      </div>
    </div>
  );
};

export default SideBar;
