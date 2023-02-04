import { useLocation } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import "./Home.scss";

const HomePage = () => {
  const location = useLocation();
  const username = location.state ? location.state.email : "";

  return (
    <div style={{ background: "black", height: "100vh", color: "white" }}>
      <nav className="navbar">
        <div className="nav-logo">
          <img src={Logo} alt="logo" className="logo-img" />
          <span className="logo-name">Doubleshy0N</span>
        </div>
        <div>Nav Item</div>
        <div>Avatar Icon</div>
      </nav>

      <h1>Welcome {username}!</h1>
      <p>You are now logged in.</p>
    </div>
  );
};

export default HomePage;
