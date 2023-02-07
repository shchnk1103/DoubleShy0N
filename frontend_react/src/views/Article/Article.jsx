import "./Article.scss";
import Avatar from "../../assets/avatar.jpg";

export const Article = () => {
  const articleItem = [
    {
      title: "2022 给我们带来的教训",
      author: "Andy Barnes",
      content:
        "刚刚过去的 2022 年，是一个非常特殊的年份，因为它打破了多个纪录。",
      date: "2023.02.04",
    },
    {
      title: "2022 给我们带来的教训",
      author: "Andy Barnes",
      content:
        "刚刚过去的 2022 年，是一个非常特殊的年份，因为它打破了多个纪录。",
      date: "2023.02.04",
    },
    {
      title: "2022 给我们带来的教训",
      author: "Andy Barnes",
      content:
        "刚刚过去的 2022 年，是一个非常特殊的年份，因为它打破了多个纪录。",
      date: "2023.02.04",
    },
  ];

  return (
    <div className="article-page">
      <div className="article-cards">
        <div className="card">
          <div className="article-card">
            <span className="title">2022 给我们带来的教训</span>
            <span className="content">
              刚刚过去的 2022
              年，是一个非常特殊的年份，因为它打破了多个纪录。举例来说，2022
              年是过去 150 年以来（从 1872
              年算起）美国国债回报最差的一年。去年一年，美国 10
              年期国债市值下跌约 16%，这在过去 150 年中从未发生过。 刚刚过去的
              2022
              年，是一个非常特殊的年份，因为它打破了多个纪录。举例来说，2022
              年是过去 150 年以来（从 1872
              年算起）美国国债回报最差的一年。去年一年，美国 10
              年期国债市值下跌约 16%，这在过去 150 年中从未发生过。
            </span>
          </div>

          <div className="profile-detail">
            <img src={Avatar} alt="avatar" className="avatar" />
            <div className="profile-word">
              <span className="profile-name">Andy Barnes</span>
              <span className="profile-subname">IOS DEVELOPER</span>
            </div>
          </div>
        </div>

        <div className="card card-1"></div>
        <div className="card card-2"></div>
      </div>

      <div className="latest-articles">
        <div className="title">
          <span className="title-detail">最新发布：</span>
        </div>

        <div className="article-list">
          {articleItem.map((item, index) => (
            <div className="article-item">
              <div className={index === 0 ? "number selected" : "number"}>
                <span>{index + 1}</span>
              </div>

              <div className="detail">
                <span className="detail-title">{item.title}</span>
                <span className="detail-author">{item.author}</span>
                <span className="detail-content">{item.content}</span>
              </div>

              <div className={index === 0 ? "date selected" : "date"}>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="btn">
          <button className="btn-detail">Read More</button>
        </div>
      </div>
    </div>
  );
};
