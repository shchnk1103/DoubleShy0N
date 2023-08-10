import ArticleCardList from "@/components/Home/ArticleCardList";
import HomeComponent from "@/components/Home/HomeComponent";
import SideBar from "@/components/Home/SideBar";

const Home = () => {
  return (
    <>
      <HomeComponent/>

      <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-2">
        <ArticleCardList/>

        <SideBar/>
      </div>
    </>
  );
};

export default Home;
