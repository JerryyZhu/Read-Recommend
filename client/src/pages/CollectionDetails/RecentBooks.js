import React from "react";
import { Typography, Card } from "antd";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const { Meta } = Card;
const { Title } = Typography;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    partialVisibilityGutter: 30
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0
    },
    items: 1,
    partialVisibilityGutter: 30
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464
    },
    items: 2,
    partialVisibilityGutter: 30
  }
};

const BookCarousel = ({books}) => (
  <>
    <Title level={4}>Recently Added Books</Title>
    <Carousel
      partialVisible
      // deviceType={"desktop"}
      itemClass="image-item"
      responsive={responsive}
    >
      {books.map(({title, url, id, author}) => (
        <BookCard title={`${title}`} id={id} url={url} author={author} key={`book-card-${id}`} />
      ))}
    </Carousel>
  </>
)

const BookCard = ({title, id, author, url}) => (
  <Card
      hoverable
      style={{ width: "150px"}}
      cover={<img alt="example" src={url} />}
      onClick={() => {window.location.assign(`/book-details/${id}`)}}
  >
    <Meta title={title} description={author}/>
  </Card>
);

export default BookCarousel;