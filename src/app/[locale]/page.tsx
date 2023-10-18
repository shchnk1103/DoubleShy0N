import Footer from "@/components/Footer/Footer";
import ArticleCardList from "@/components/Home/ArticleCardList";
import HomeComponent from "@/components/Home/HomeComponent";
import SideBar from "@/components/Home/SideBar";
import NavBar from "@/components/NavBar/NavBar";
import { useTranslations } from "next-intl";

const Home = () => {
  const t = useTranslations("Home");
  let homeData = {
    title: t("title"),
    subtitle_1: t("subtitle_1"),
    name: t("name"),
    subtitle_2: t("subtitle_2"),
    contact_me: t("contact_me"),
  };
  let articleListData = {
    title: t("latest_articles"),
    tip_1: t("tip_1"),
    tip_2: t("tip_2"),
  };

  return (
    <>
      <NavBar />

      <HomeComponent data={homeData} />

      <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-2 padding">
        <ArticleCardList data={articleListData} />

        <SideBar />
      </div>

      <Footer />
    </>
  );
};

export default Home;
