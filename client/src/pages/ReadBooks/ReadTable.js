import React from "react";
import { Table, Space, Typography, Card, Layout } from "antd";
import moment from "moment";


const { Title } = Typography;
const { Content } = Layout;

const thumbnailStyle = {
  width: "50px",
  height: "80px",
  backgroundPosition: "50% 50%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  margin: "0 auto",
};

const readColumn = [
  {
    title: "Image",
    dataIndex: "url",
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
    sorter: (a, b) => a.publicationYear - b.publicationYear,
  },
  {
    title: "Publisher",
    dataIndex: "publisher",
  },
  {
    title: "Date Read",
    dataIndex: "dateAdded",
    render: (date) => (
      <div>
        { moment(date, moment.DATETIME_LOCAL_MS).format("DD/MM/YYYY") }
      </div>
    )
  },
  {
    title: "My Rating",
    dataIndex: "userRating",
  },
  {
    title: "Category",
    dataIndex: "genre",
  },
];

const ReadTable = ({readBooks}) => {
  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Title style={{ marginTop: "20px" }}>Read Books</Title>
      <Card>
        <Content>
          <Table columns={readColumn} rowKey="id" dataSource={ readBooks.books } scroll={{ x: 800 }}/>
        </Content>
      </Card>
    </Layout>
  );
};

export default ReadTable;