import React, { useState } from "react";
import { Row, Layout, Select, Input, Popover, Button, Dropdown, Menu } from "antd";
import { MenuOutlined, LogoutOutlined } from '@ant-design/icons';
import routes from "../routes";

import {
  AreaChartOutlined,
  BookOutlined,
  CheckOutlined
} from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

const { Header, Content } = Layout;

const AuthenticatedLayout = props => {
  const [searchMode, setSearchMode] = useState("title");

  const onLogout = () => {
    // Remove token & other stored data
    localStorage.clear();
    props.history.push(routes.login);
  };

  const navigateToCollection = () => {
    // Remove token & other stored data
    window.location.assign(routes.collections);
  };

  const navigateToChallenges = () => {
    // Remove token & other stored data
    window.location.assign(routes.challenges);
  };

  const navigateToReadBooks = () => {
    // Remove token & other stored data
    window.location.assign(routes.readbooks);
  };
  return (
    <Layout>

      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          backgroundColor: "#000066"
        }}
      >
        <Row
          type="flex"
          align="middle"
          justify="space-between"
          style={{ height: "100%" }}
        >
          <a href={routes.collections}><h1 className="vertical-align" style={{ color: "white" }}>ReadRecommend</h1></a>
          <Search
            className="vertical-align"
            onSearch={value => window.location.assign(`
              ${routes.booksearch}?mode=${searchMode}&search=${value}
            `)}
            style={{ width: 512 }}
            suffix={
              <Select value={searchMode} style={{ width: 120 }} onChange={(value) => setSearchMode(value)}>
                <Option value="title">By Title</Option>
                <Option value="author">By Author</Option>
                <Option value="recent">
                  <Popover placement="bottom" content={"By Recently Added Books"}>
                    By Recently Added Books
                    </Popover>
                  </Option>
              </Select>
            }
          />
          <Dropdown
            className="vertical-align"
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={navigateToCollection}>
                <BookOutlined />
              My Collections
            </Menu.Item>
                <Menu.Item key="2" onClick={navigateToChallenges}>
                <AreaChartOutlined />
              My Challenges
            </Menu.Item>
                <Menu.Item key="3" onClick={navigateToReadBooks}>
                <CheckOutlined />
              My Read Books
            </Menu.Item>
                <Menu.Item key="4" onClick={onLogout}>
                  <LogoutOutlined />
                  Logout
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <Button ghost className="primary-btn" icon={<MenuOutlined />} />
          </Dropdown>
        </Row>
      </Header>

      <Content style={{ padding: "0 50px", marginTop: 64, height: "100%" }}>
        {props.children}
      </Content>
    </Layout>
  );
}

export default AuthenticatedLayout;
