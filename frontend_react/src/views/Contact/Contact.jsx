import "./Contact.scss";
import { HiOutlineMail, HiArrowNarrowRight } from "react-icons/hi";
import { AiFillWechat, AiOutlinePhone } from "react-icons/ai";

export const Contact = () => {
  const ContactItem = [
    {
      icon: "HiOutlineMail",
      header: "邮箱地址:",
      number: "doubleshy0n@qq.com",
      btnName: "点击发送",
      btnIcon: "HiArrowNarrowRight",
    },
  ];

  return (
    <div className="contact-page">
      <div className="contact-title">
        <span className="contact-title-detail">联系我们</span>
        <div className="contact-line"></div>
      </div>

      <div className="contact-content">
        <div className="content-left">
          <div className="content-detail">
            <HiOutlineMail className="content-icon" />
            <span className="content-header">邮箱地址:</span>
            <span className="content-number">doubleshy0n@qq.com</span>
            <span className="content-btn">
              点击发送
              <HiArrowNarrowRight className="content-btn-icon" />
            </span>
          </div>

          <div className="content-detail">
            <AiFillWechat className="content-icon" />
            <span className="content-header">微信账号:</span>
            <span className="content-number">shchk1103</span>
            <span className="content-btn">
              点击添加
              <HiArrowNarrowRight className="content-btn-icon" />
            </span>
          </div>

          <div className="content-detail">
            <AiOutlinePhone className="content-icon" />
            <span className="content-header">手机号码:</span>
            <span className="content-number">18367336606</span>
            <span className="content-btn">
              点击联系
              <HiArrowNarrowRight className="content-btn-icon" />
            </span>
          </div>
        </div>

        <div className="content-right">
          <span className="content-title">网站留言</span>

          <div className="content-detail">
            <input type="text" className="content-username-input" />
            <label htmlFor="username" className="content-label">
              用户名:
            </label>
          </div>

          <div className="content-detail">
            <input type="text" className="content-email-input" />
            <label htmlFor="email" className="content-label">
              邮箱地址:
            </label>
          </div>

          <div className="content-detail content-lg">
            <input type="text" className="content-input" />
            <label htmlFor="content" className="content-label">
              请在这里写下您宝贵的意见，我们团队肯定会虚心接受。
            </label>
          </div>

          <button className="content-btn">
            <span>提 交</span>
          </button>
        </div>
      </div>
    </div>
  );
};
