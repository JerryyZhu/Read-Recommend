import React from "react";
import { Table, Space, Button, Breadcrumb, Card, Layout, Divider } from "antd";
import moment from "moment";
import RecentBooks from "./RecentBooks";


const { Content } = Layout;

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
    dataIndex: "url", // this is the value that is parsed from the DB / server side
    
    // render: (theImageURL) => <div style={{...thumbnailStyle, backgroundImage: `url(${theImageURL})`}}></div>, // 'theImageURL' is the variable you must declare in order the render the URL
    render: (text, record) => (
      <a href={`/book-details/${record.id}`}>
        <div style={{...thumbnailStyle, backgroundImage: `url(${record.url})`}}></div>
      </a>
       // 'theImageURL' is the variable you must declare in order the render the URL
    )
  },
  {
    title: "Title",
    dataIndex: "title",

    // specify the condition of filtering result
    // here is that finding the name started with `value`
    //   onFilter: (value, record) => record.name.indexOf(value) === 0,
    //   sorter: (a, b) => a.name.length - b.name.length,
    //   sortDirections: ['descend'],
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
    dataIndex: "userRating",
  },
];

const CollectionTable = ({isOwner, collectionDetails, loading, removeBook}) => {
  const deleteColumn = {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <Button danger onClick={removeBook(record.id)}>Delete</Button> 
      </Space>
    ),
  };

  let cc = collectionColumn()

  if (isOwner && collectionDetails.id !== "all") {
    cc.push(deleteColumn)
  }

  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "0 0" }}>
        <Breadcrumb.Item>{`${collectionDetails.userFirstName} ${collectionDetails.userLastName}`}</Breadcrumb.Item>
        <Breadcrumb.Item>{collectionDetails.name}</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Content>
          <RecentBooks
            books={collectionDetails.books.slice(0, 10)}
          />
          <Divider />
          <Table loading={loading} columns={cc} rowKey="id" dataSource={ collectionDetails.books } scroll={{ x: 800 }}/>
        </Content>
      </Card>
    </Layout>
  );
};

export default CollectionTable;