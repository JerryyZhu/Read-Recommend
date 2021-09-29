import React from "react";
import {
  Card,
  Row,
  Button,
  Col,
  Popconfirm,
  Rate,
  Typography,
  Spin,
} from "antd";

const { Text, Paragraph } = Typography;

const colStyle = {
  paddingLeft: "15px",
  paddingRight: "15px",
};

const ratingTextStyle = {
  marginLeft: "15px",
};

const reviewTextStyle = {
  float: "right",
};

const mainCardStyle = {
  border: "1px solid #dcdcdc",
  boxShadow: "0px 15px 20px 5px #0000001a",
  // margin: "100px",
  marginTop: "20px",
};

const BookDetails = ({ bookDetail, bookReviews, userReview, deleteLoading, deleteReview, setRating, rateLoading, collectionDropdown }) => (
  <Card bordered={false} style={mainCardStyle}>
    <Row>
      <Col span={6}>
        <Row style={{ textAlign: "center" }} justify="center">
          <Card
            cover={
              <img
                alt="book"
                src={bookDetail.url}
              />
            }
          >
            {collectionDropdown}
            <Text>My Rating</Text>
            {userReview ?
              (userReview.review ?
                <Popconfirm
                  title="This will also delete your review."
                  onConfirm={deleteReview}
                  okText="Delete"
                  cancelText="Cancel"
                >
                  <Button disabled={deleteLoading} danger type="link">
                    clear rating
                  </Button>
                </Popconfirm>
                : <Button disabled={deleteLoading} onClick={deleteReview} danger type="link">clear rating</Button>) : null
            }
            <br />
            {rateLoading || deleteLoading ?
              <Spin /> :
              <Rate disabled={rateLoading} value={userReview ? userReview.rating : 0} onChange={setRating} />
            }
          </Card>
        </Row>
      </Col>
      <Col span={18} style={colStyle}>
        <h1 style={{ textAlign: "center" }}>
          {bookDetail.title}
        </h1>
        <h3 style={{ textAlign: "center" }}>
          {`By ${bookDetail.author}`}
        </h3>
        <Rate defaultValue={bookReviews.averageRating} allowHalf disabled />
        <span>
          <Text style={ratingTextStyle}>{`${bookReviews.averageRating.toFixed(2)}/5.00 Rating`}</Text>
          <Text style={reviewTextStyle}>
            {`${bookDetail.numberReads} read - ${bookReviews.totalRatings} ratings`}
          </Text>
        </span>
        <Paragraph>{bookDetail.description}</Paragraph>
        <Paragraph>{`Genres: ${bookDetail.genre}`}</Paragraph>
        <Paragraph>{`Word Count: ${bookDetail.wordCount}`}</Paragraph>
        <Paragraph>{`Publication Year - ${bookDetail.publicationYear}`}</Paragraph>
        <Paragraph>{`Publisher - ${bookDetail.publisher}`}</Paragraph>
      </Col>
    </Row>
  </Card>
)

export default BookDetails;
