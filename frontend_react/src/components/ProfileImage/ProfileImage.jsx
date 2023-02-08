import "./ProfileImage.scss";
import Avatar from "../../assets/avatar.jpg";
import { useEffect, useRef, useState } from "react";

export const ProfileImage = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownTimeout = useRef(null);

  // 清除掉当前的计时器
  useEffect(() => {
    return () => {
      clearTimeout(dropdownTimeout.current);
    };
  }, []);

  return (
    <div className="profile-image">
      <img
        src={Avatar}
        alt="avatar"
        className="avatar"
        onMouseEnter={() => setIsDropdownVisible(true)}
        onMouseLeave={() => {
          dropdownTimeout.current = setTimeout(() => {
            setIsDropdownVisible(false);
          }, 300);
        }}
        onClick={() => setIsDropdownVisible(true)}
      />

      <div
        className={`navbar-dropdown ${
          isDropdownVisible ? "dropdown-show" : ""
        }`}
        onMouseEnter={() => {
          clearTimeout(dropdownTimeout.current);
        }}
        onMouseLeave={() => {
          dropdownTimeout.current = setTimeout(() => {
            setIsDropdownVisible(false);
          }, 300);
        }}
      >
        <span className="dropdown-content dropdown-username">DoubleShy0N</span>
        <span className="dropdown-content">个人资料</span>
        <span className="dropdown-content">浏览记录</span>
        <span className="dropdown-content">切换账户</span>
        <span className="dropdown-content dropdown-signout">退出登录</span>
      </div>
    </div>
  );
};
