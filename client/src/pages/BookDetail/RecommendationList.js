import React from "react";
import Recommendations from "./Recommendations";
import { Button, Space, Divider } from "antd";
import {styles} from './styles';

const RecommendationList = ({
  recommendations,
  userRecommendation,
  deleteLoading,
  toggleModal,
  deleteRecommendation,
}) => {
  const generateList = (r) => {
    return r
      ? r.map((recommendation, index) => {
          return (
            <>
              <Recommendations recommendations={recommendation} key={`book-${recommendation.bookId}`}/>
            </>
          );
        })
      : null;
  };

  return (
    <>
    <div style={styles.container}>
    <h1>User Recommendations</h1>
      <Space>
        {userRecommendation && userRecommendation.target ? (
          <Button danger disabled={deleteLoading} onClick={deleteRecommendation}>
            Delete Recommendation
          </Button>
        ) : null}
        <Button type="primary" onClick={toggleModal}>
          {userRecommendation && userRecommendation.target
            ? "Edit Recommendation"
            : "Add a Recommendation"}
        </Button>
      </Space>
    </div>
    <Divider/>
      {generateList(recommendations)}
    </>
  );
};

export default RecommendationList;
