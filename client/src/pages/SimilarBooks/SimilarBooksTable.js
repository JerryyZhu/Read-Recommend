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
        {text}
      </a>
    ),
  },
  {
    title: "Author",
    dataIndex: "author",
  },
  {
    title: "Similarity Score",
    dataIndex: "similarity",
    render: (similarity) => (
      <>
        {`${Number(similarity).toFixed(2)}%`}
      </>
    ),
    sorter: (a, b) => a.similarity - b.similarity,
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

const SimilarBooks = ({ books }) => {
  const onChange = () => {};
  return (
    <div>
      {/* Need to modify scroll */}
      <Table columns={columns} rowKey="id" dataSource={books} scroll={{ x: 800 }} onChange={onChange} />
    </div>
  );
};

export default SimilarBooks;
