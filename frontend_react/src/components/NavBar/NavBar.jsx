import { useState } from "react";
import Avatar from "../../assets/avatar.jpg";
import Logo from "../../assets/logo.svg";
import "./NavBar.scss";

export const NavBar = () => {
  const [selected, setSelected] = useState(0);
  const navItems = [
    { name: "首页" },
    { name: "文章" },
    { name: "设计" },
    { name: "开发" },
    { name: "联系我们" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={Logo} alt="logo" className="logo-img" />
        <span className="logo-name">Doubleshy0N</span>
      </div>

      <div>
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
        <div className="underline"></div>
      </div>

      <div className="profile-image">
        <img src={Avatar} alt="avatar" className="avatar" />
      </div>
    </nav>
  );
};
