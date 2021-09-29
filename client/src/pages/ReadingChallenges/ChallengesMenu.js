import React from "react";
import routes from "../../routes";
import queryString from 'query-string';
import { Menu, Layout, Divider, Typography } from "antd";
const { Sider } = Layout;
const { Text } = Typography;

const CollectionMenu = ({ challenges }) => {

  return (
    <Sider
      width={256}
      style={{ textAlign: "center", backgroundColor: "#fff", marginTop: "15px" }}
    >
      <Text strong style={{ padding: "16px" }}>
        Challenges
      </Text>
      
      <Divider style={{ margin: "10px 0px 10px 0px" }} />
      {/* Menu needs to be sorted by most recently completed */}
      <Menu>
        <Menu.Item key={0} onClick={() => {
          window.location.assign(routes.challenges);
        }}>
          Current Challenge
        </Menu.Item>
        {challenges.past.reverse().map(({ startDate, endDate, id }) =>
          <Menu.Item key={`${id}`} onClick={() => {
            window.location.assign(routes.challenges + '?' + queryString.stringify({ id: id }));
          }}>
            {startDate} - {endDate}
          </Menu.Item>
        )}
      </Menu>
    </Sider>
  );
};

export default CollectionMenu;