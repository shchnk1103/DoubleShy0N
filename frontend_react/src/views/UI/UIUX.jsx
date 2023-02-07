import "./UIUX.scss";
import Center from "../../assets/ui-center.jpg";
import Left from "../../assets/ui-left.jpg";
import Right from "../../assets/ui-right.jpg";

export const UIUX = () => {
  return (
    <div className="ui-page">
      <div className="ui-title">
        <span className="ui-title-detail">UI / UX 展示</span>
        <div className="ui-line"></div>
      </div>

      <div className="ui-show">
        <img src={Left} alt="left" className="ui-left" />
        <img src={Center} alt="center" className="ui-center" />
        <img src={Right} alt="right" className="ui-right" />
      </div>
    </div>
  );
};
