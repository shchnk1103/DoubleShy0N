import { useLocation } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import { Home } from "../../components/HomePage/Home";
import "./HomePage.scss";

const HomePage = () => {
  const location = useLocation();
  const username = location.state ? location.state.email : "";

  return (
    <div className="home-page">
      <NavBar />

      <Home />
    </div>
  );
};

export default HomePage;
