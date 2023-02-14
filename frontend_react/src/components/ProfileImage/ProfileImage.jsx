import "./ProfileImage.scss";
import Avatar from "../../assets/avatar.jpg";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useAxios } from "../../utils/useAxios";

export const ProfileImage = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const dropdownTimeout = useRef(null);

  let api = useAxios();
  let { logoutUser, user } = useContext(AuthContext);
  const id = user.user_id;

  // 清除掉当前的计时器
  useEffect(() => {
    return () => {
      clearTimeout(dropdownTimeout.current);
    };
  }, []);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    let response = await api.get("/api/users/" + id);

    if (response.status === 200) {
      setUserInfo(response.data);
    }
  };

  return (
    <div className="profile-image">
      <img
        src={userInfo.profile_picture}
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
        <span className="dropdown-content dropdown-username">
          {userInfo.name}
        </span>
        <span className="dropdown-content">个人资料</span>
        <span className="dropdown-content">浏览记录</span>
        <span className="dropdown-content">写文章</span>
        <span
          className="dropdown-content dropdown-signout"
          onClick={logoutUser}
        >
          退出登录
        </span>
      </div>
    </div>
  );
};
