import React from "react";
import { Table } from "antd";

const thumbnailStyle = {
  width: "50px",
  height: "80px",
  backgroundPosition: "50% 50%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  margin: "0 auto",
};

const columns = [
  {
    title: "Image",
    dataIndex: "bookImage", // this is the value that is parsed from the DB / server side
    render: (text, record) => (
      <a href={`/book-details/${record.id}`}>
        <div style={{...thumbnailStyle, backgroundImage: `url(${record.url})`}}></div>
      </a>
    )
  },
  {
    title: "Title",
    dataIndex: "title",
    render: (text, record) => (
      <a href={`/book-details/${record.id}`}>
        <p>{text}</p>
      </a>
    ),
    defaultSortOrder: "ascend",
  },
  {
    title: "Author",
    dataIndex: "author",
    defaultSortOrder: "descend",
  },
  {
    title: "Rating",
    dataIndex: "averageRating",
    render: (averageRating) => (
      <>
        {`${Number(averageRating).toFixed(2)}`}
      </>
    ),
    sorter: (a, b) => a.averageRating - b.averageRating,
  },
  {
    title: "Publication",
    dataIndex: "publicationYear",
    sorter: (a, b) => a.publicationYear - b.publicationYear,
  },
  {
    title: "Category",
    dataIndex: "genre",
  },
];

const SearchTable = ({ books, filterStars }) => (
  <div>
    {/* Need to modify scroll */}
    <Table columns={columns} rowKey="id" dataSource={books.filter(({averageRating}) => filterStars[0] <= averageRating && averageRating <= filterStars[1])} scroll={{ x: 800 }} />
  </div>
);

export default SearchTable;
