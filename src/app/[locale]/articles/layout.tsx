import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar/NavBar";
import Tags from "@/components/Tags";
import { useTranslations } from "next-intl";
import React from "react";

const layout = ({ children }) => {
  const t = useTranslations("Home");

  return (
    <>
      <NavBar />

      <div className="flex justify-start items-start w-full my-8 padding">
        <span className="mr-4 my-1 blue_gradient font-semibold text-2xl whitespace-nowrap">
          {t("tags")}
        </span>
        <Tags />
      </div>

      {children}

      <Footer />
    </>
  );
};

export default layout;
