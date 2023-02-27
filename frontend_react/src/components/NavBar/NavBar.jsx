import "./NavBar.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { ProfileImage } from "../ProfileImage/ProfileImage";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { AiOutlineHome, AiOutlineLogin } from "react-icons/ai";
import {
  MdOutlineArticle,
  MdOutlineDesignServices,
  MdOutlineDeveloperBoard,
  MdOutlineContactMail,
} from "react-icons/md";

const navItems = [
  { name: "首页", id: "home", icon: <AiOutlineHome /> },
  { name: "文章", id: "article", icon: <MdOutlineArticle /> },
  { name: "设计", id: "UI", icon: <MdOutlineDesignServices /> },
  { name: "开发", id: "develop", icon: <MdOutlineDeveloperBoard /> },
  { name: "联系我们", id: "contact", icon: <MdOutlineContactMail /> },
];

export const NavBar = () => {
  const [selected, setSelected] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState("");
  const navRef = useRef(null);
  const [showIcon, setShowIcon] = useState(false);
  const [distance, setDistance] = useState(80);
  let { user } = useContext(AuthContext);

  // 点击Nav Item, 页面滑动到指定位置
  const handleClick = (index) => {
    setSelected(index);
    handleResize();

    // 点击平滑过渡
    const target = document.getElementById(navItems[index].id);
    const scrollTop = target.offsetTop - distance;
    window.scrollTo({ top: scrollTop, behavior: "smooth" });
  };

  // 控制下划线
  useEffect(() => {
    handleResize();
  }, [selected]);

  const handleResize = () => {
    if (navRef.current) {
      const selectedElement = navRef.current.querySelector(".selected");
      if (selectedElement) {
        const { offsetLeft, offsetWidth } = selectedElement;
        setUnderlineStyle({
          width: offsetWidth,
          transform: `translateX(${offsetLeft}px)`,
        });
      }
    }

    if (window.innerWidth <= 1000) {
      setShowIcon(true);
      setDistance(60);
    } else if (window.innerWidth <= 768) {
      setShowIcon(true);
      setDistance(60);
    } else {
      setShowIcon(false);
      setDistance(80);
    }
  };

  useEffect(() => {
    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-detail">
        <div className="nav-logo">
          <img src={Logo} alt="logo" className="logo-img" />
          <span className="logo-name">Doubleshy0N</span>
        </div>

        <div className="nav" ref={navRef}>
          <ul className="nav-item">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={
                  selected === index
                    ? "nav-item-detail selected"
                    : "nav-item-detail"
                }
                onClick={() => handleClick(index)}
              >
                {!showIcon && item.name}
                {showIcon && item.icon}
              </li>
            ))}
          </ul>

          {/* underline */}
          {navRef.current && (
            <hr className="underline" style={underlineStyle} />
          )}
        </div>

        {user ? (
          <ProfileImage />
        ) : (
          <Link to="/login" className="login-link">
            <button className="login-btn">{!showIcon && "登陆"}</button>
            <button className="login-btn login-btn-icon">
              {showIcon && <AiOutlineLogin />}
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};
