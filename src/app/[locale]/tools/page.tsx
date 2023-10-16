import ToolCard from "@/components/Tools/ToolCard";
import { PokemonTool } from "@/components/Tools/ToolTypes";
import { useTranslations } from "next-intl";

const Tools = () => {
  const t = useTranslations("Tools");

  return (
    <div className="min-h-[75vh] w-full flex-start flex-col gap-8 padding">
      <div className={"text-left w-full flex-start flex-col gap-2"}>
        <h1 className={"blue_gradient text-5xl font-semibold mt-4"}>
          {t("title")}
        </h1>
        <span className={"text-xl"}>{t("subtitle")}</span>
      </div>

      <div className={"w-full grid md:grid-cols-2 grid-cols-1"}>
        <ToolCard type={PokemonTool} />
      </div>
    </div>
  );
};

export default Tools;
