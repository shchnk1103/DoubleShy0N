import "./HomePage.scss";
import { useLocation } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import { Home } from "../../components/HomePage/Home";
import { Article } from "../Article/Article";
import { UIUX } from "../UI/UIUX";
import { Development } from "../Development/Development";
import { Contact } from "../Contact/Contact";
import { Footer } from "../Footer/Footer";

const HomePage = () => {
  const location = useLocation();
  const username = location.state ? location.state.email : "";

  return (
    <div className="home-page">
      <NavBar />

      <Home />

      <Article />

      <UIUX />

      <Development />

      <Contact />

      <Footer />
    </div>
  );
};

export default HomePage;
