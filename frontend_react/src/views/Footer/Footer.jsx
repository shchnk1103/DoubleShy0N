import "./Footer.scss";

export const Footer = () => {
  const footerItems = [
    {
      title: "首页",
      item1: "商店",
      item2: "Mac",
      item3: "iPad",
      item4: "Watch",
      item5: "AirPods",
    },
    {
      title: "文章",
      item1: "最新发布",
      item2: "热度最高",
      item3: "搜索",
    },
    {
      title: "账户",
      item1: "管理您的账户",
      item2: "账户状态",
      item3: "搜索别的用户",
    },
    {
      title: "设计",
      item1: "我们的UI设计作品",
      item2: "我们的网页作品",
      item3: "我们的部分代码示例",
    },
    {
      title: "联系我们",
      item1: "工作机会",
      item2: "寻求合作",
      item3: "联系方式",
    },
  ];

  return (
    <div className="footer">
      <div className="footer-content">
        {footerItems.map((item, index) => (
          <div className="footer-content-detail" key={index}>
            <span className="footer-title" key={"title-${index}"}>
              {item.title}
            </span>
            <span key={"item1-${index}"}>{item.item1}</span>
            <span key={"item2-${index}"}>{item.item2}</span>
            <span key={"item3-${index}"}>{item.item3}</span>
            <span key={"item4-${index}"}>{item.item4}</span>
            <span key={"item5-${index}"}>{item.item5}</span>
          </div>
        ))}
      </div>

      <div className="footer-line"></div>

      <div className="footer-copyright">
        <span>Copyright © 2023 Apple Inc. 保留所有权利。</span>
        <span>
          京ICP备10214630号 营业执照 无线电发射设备销售备案编号11201910351200
        </span>
      </div>
    </div>
  );
};
