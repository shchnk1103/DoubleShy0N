import "./NavBar.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { ProfileImage } from "../ProfileImage/ProfileImage";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export const NavBar = () => {
  const [selected, setSelected] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState("");
  const navRef = useRef(null);
  const navItems = [
    { name: "首页", id: "home" },
    { name: "文章", id: "article" },
    { name: "设计", id: "UI" },
    { name: "开发", id: "develop" },
    { name: "联系我们", id: "contact" },
  ];

  let { user } = useContext(AuthContext);

  // 点击Nav Item, 页面滑动到指定位置
  const handleClick = (index) => {
    setSelected(index);

    // 点击平滑过渡
    const target = document.getElementById(navItems[index].id);
    const scrollTop = target.offsetTop - 80;
    console.log(scrollTop);
    window.scrollTo({ top: scrollTop, behavior: "smooth" });
  };

  // 控制下划线
  useEffect(() => {
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
  }, [selected]);

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
                {item.name}
              </li>
            ))}
          </ul>
          {navRef.current && (
            <hr className="underline" style={underlineStyle} />
          )}
        </div>

        {user ? (
          <ProfileImage />
        ) : (
          <Link to="/login" className="login-link">
            <button className="login-btn">登陆</button>
          </Link>
        )}
      </div>
    </nav>
  );
};
