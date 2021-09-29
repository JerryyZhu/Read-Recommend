import React from "react";
import { Card, Col } from "antd";
import routes from "../../routes";

const BookCard = ({title, id, history}) => (
  <Col span={2}>
    <a href={`/book-details/${id}`}>
      <Card
        hoverable
        cover={<img src="https://bookriot.com/wp-content/uploads/2014/08/HP_hc_new_2-e1407533769415.jpeg" />}
        // need to put title inside cover... 
        title={`${title}`}
        bodyStyle={{padding: "0"}}
      />
    </a>
  </Col>
);

export default BookCard;