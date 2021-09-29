import React from "react";
import { Comment, Avatar, Rate, Typography } from "antd";
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography

const Review = ({ name, review, rating, userID }) => {
  const navigateToProfile = (userId) => {
    if (userId) {
      return `/collection?userID=${userID}`;
    }
    return `/collection`;
  };

  return (
    <>
      <Comment
        author={<a href={navigateToProfile(userID)}>{name}</a>}
        avatar={<a href={navigateToProfile(userID)}><Avatar icon={<UserOutlined />}  alt={name} /></a>}
        content={
          <Text style={{ whiteSpace: "pre-wrap" }}>
            {review}
          </Text>
        }
      >
      I rated this <Rate disabled value={rating} /> stars
    </Comment>
    </>
  );
};

export default Review;
