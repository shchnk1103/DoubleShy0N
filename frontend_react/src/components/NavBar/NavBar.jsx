import { useEffect, useRef, useState } from "react";
import { ProfileImage } from "../ProfileImage/ProfileImage";
import Logo from "../../assets/logo.svg";
import "./NavBar.scss";

export const NavBar = () => {
  const [selected, setSelected] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState("");
  const navRef = useRef(null);
  const navItems = [
    { name: "首页" },
    { name: "文章" },
    { name: "设计" },
    { name: "开发" },
    { name: "联系我们" },
  ];

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
                onClick={() => setSelected(index)}
              >
                {item.name}
              </li>
            ))}
          </ul>
          {navRef.current && (
            <hr className="underline" style={underlineStyle} />
          )}
        </div>

        <ProfileImage />
      </div>
    </nav>
  );
};
