import Footer from "@/components/Footer";
import ArticleCardList from "@/components/Home/ArticleCardList";
import HomeComponent from "@/components/Home/HomeComponent";
import SideBar from "@/components/Home/SideBar";
import NavBar from "@/components/NavBar/NavBar";

const Home = () => {
  return (
    <>
      <NavBar />

      <HomeComponent />

      <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-2">
        <ArticleCardList />

        <SideBar />
      </div>

      <Footer />
    </>
  );
};

export default Home;
