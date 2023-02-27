import arrow from "../../assets/arrow.svg";
import homeImage from "../../assets/home-image.jpg";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { SiDiscord } from "react-icons/si";
import "./Home.scss";

export const Home = () => {
  const handleClick = () => {
    const target = document.getElementById("article");
    const scrollTop = target.offsetTop - 80;
    window.scrollTo({ top: scrollTop, behavior: "smooth" });
  };

  return (
    <div className="home" id="home">
      <ul className="social-icon-list">
        <li className="social-icon ins">
          <BsInstagram className="social-icon-img" />
        </li>
        <li className="social-icon twitter">
          <BsTwitter className="social-icon-img" />
        </li>
        <li className="social-icon discord">
          <SiDiscord className="social-icon-img" />
        </li>
      </ul>

      <div className="home-center">
        <span className="title">
          展现不一样的自己，祝愿你
          <br />
          在这里找到属于你的那一份美好!
        </span>

        <div className="btn-background" onClick={handleClick}>
          <button className="home-btn" type="button">
            <span>点击开始探索</span>
            <img src={arrow} alt="arrow" />
          </button>
        </div>
      </div>

      <div>
        <img src={homeImage} alt="" className="home-image" />
      </div>
    </div>
  );
};
