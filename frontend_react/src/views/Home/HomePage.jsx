import "./HomePage.scss";
import { useLocation } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import { Home } from "../../components/HomePage/Home";
import { Article } from "../Article/Article";
import { UIUX } from "../UI/UIUX";
import { Development } from "../Development/Development";
import { Contact } from "../Contact/Contact";
import { Footer } from "../Footer/Footer";

const HomePage = (props) => {
  const location = useLocation();
  const username = location.state ? location.state.email : "";
  const { darkMode, onToggleDarkMode } = props;

  const handleToggleDarkMode = () => {
    onToggleDarkMode();
  };

  return (
    <div className="home-page">
      <NavBar />

      <Home />

      <Article />

      <UIUX />

      <Development />

      <Contact />

      <Footer />

      <label className="switch">
        <input type="checkbox" />
        <span className="slider" onClick={handleToggleDarkMode}></span>
      </label>
    </div>
  );
};

export default HomePage;
