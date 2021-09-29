import React from "react";
import { Card, Tooltip } from "antd";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    paritialVisibilityGutter: 30
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

const BookCarousel = ({ books }) => (
  <div>
    <h2 style={{textAlign: "center"}}>We recommend these books with our Machine Learning Algorithm</h2>
    <Carousel
      partialVisbile
      // deviceType={"desktop"}
      itemClass="image-item"
      responsive={responsive}
      >
      {books.map(({title, url, id, author}) => {
      return <BookCard title={`${title}`} id={id} url={url} author={author} />
    })}
    </Carousel>
  </div>
);

const BookCard = ({title, id, author, url}) => (
    <Tooltip title={`${title}-${author}`}>
    <Card
        style={{ width: "200px", height: "350px"}}
        cover={<img alt="example" src={url} />}
        onClick={() => {window.location.assign(`/book-details/${id}`)}}
    >
    </Card>
  </Tooltip>
);

export default BookCarousel;