import React from "react";
import { Comment, Avatar, Typography } from "antd";
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Review = ({ name, review, userID }) => (
  <Comment
    author={<a href={`/collection?userID=${userID}`}>{name}</a>}
    avatar={<a href={`/collection?userID=${userID}`}><Avatar icon={<UserOutlined />}  alt={name} /></a>}
    content={
      <Text style={{ whiteSpace: "pre-wrap" }}>
        {review}
      </Text>
    }
  />
)

export default Review;
