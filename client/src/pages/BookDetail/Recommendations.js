import React, { useState } from "react";
import { Card, Layout, Typography } from "antd";
import UserRecommendation from "./UserRecommendation";

const { Title, Link } = Typography;
const { Content, Sider } = Layout;

const Recommendations = ({recommendations}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const renderRecommendations = (recommendations) => {
    if (
      recommendations &&
      recommendations.recommendations

    ) {
      if (!expanded) {
        const first = recommendations.recommendations[0];
        return (
          <UserRecommendation
            name={first.user}
            review={first.comments}
            userID={first.userID}
          />
        );
      } else {
        return recommendations.recommendations.map((review) => (
            <UserRecommendation
              name={review.user}
              review={review.comments}
              userID={review.userID}
              key={`recommendation-${review.userID}`}
            />
          )
        );
      }
    }
    return null;
  };

  return (
    <Card bordered={false}>
      <Layout style={{ padding: "24px 0", backgroundColor: "#fff" }}>
        <Sider
          width={200}
          style={{
            textAlign: "right",
            height: "auto",
            backgroundColor: "#fff",
          }}
        >
          <a href={`/book-details/${recommendations.bookId}`}>
            <img
              src={recommendations.bookUrl}
              style={{ height: "200px" }}
              alt={recommendations.bookUrl}
            />
          </a>
        </Sider>
        <Content style={{ padding: "0 24px" }}>
          <a href={`/book-details/${recommendations.bookId}`}>
            <Title level={3}>{recommendations.book}</Title>
          </a>
          {renderRecommendations(recommendations)}
          {recommendations.recommendations.length > 1 ? <Link style={{ textAlign: "right" }} onClick={() => toggleExpand()}>
            {!expanded
              ? "Click to see more recommendations"
              : "Hide extra recommendation"}
          </Link> : null }
          
        </Content>
      </Layout>
      `
    </Card>
  );
};

export default Recommendations;
