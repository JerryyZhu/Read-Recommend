import React from "react";
import { Table, Space } from "antd";
import moment from "moment";

const thumbnailStyle = {
  width: "50px",
  height: "80px",
  backgroundPosition: "50% 50%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  margin: "0 auto",
};

const collectionColumn = () => [
  {
    title: "Image",
    dataIndex: "bookImage",
    
    render: (text, record) => (
      <a href={`/book-details/${record.id}`}>
        <div style={{...thumbnailStyle, backgroundImage: `url(${record.url})`}}></div>
      </a>
    )
  },
  {
    title: "Title",
    dataIndex: "title",
    defaultSortOrder: "ascend",
    render: (text, record) => (
      <Space size="middle">
        <a href={`/book-details/${record.id}`}>{record.title}</a>
      </Space>
    )
  },
  {
    title: "Author",
    dataIndex: "author",
    defaultSortOrder: "descend",
  },
  {
    title: "Publication",
    dataIndex: "publicationYear",
  },
  {
    title: "Publisher",
    dataIndex: "publisher",
  },
  {
    title: "Category",
    dataIndex: "genre",
  },
  {
    title: "Date Added",
    dataIndex: "dateAdded",
    render: (date) => (
      <div>
        { moment(date, moment.DATETIME_LOCAL_MS).format("DD/MM/YYYY") }
      </div>
    )
  },
  {
    title: "My Rating",
    dataIndex: "rating",
  },
];

const ChallengesTable = ({challengeDetails}) => {
  const onChange = () => {};

  return (
    <div>
      <Table columns={collectionColumn()} rowKey="id" dataSource={ challengeDetails.books } scroll={{ x: 800 }} onChange={onChange} />
    </div>
  );
};

export default ChallengesTable;