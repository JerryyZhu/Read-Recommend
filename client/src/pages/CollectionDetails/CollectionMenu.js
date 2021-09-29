import React from "react";
import { Menu } from "antd";
import routes from "../../routes";
import queryString from 'query-string';
import { Button, Layout, Divider, Typography } from "antd";
const { Sider } = Layout;
const { Text } = Typography;

const CollectionMenu = ({ currentUser, userID, toggleAddCollectionModal, collections }) => {

  return (
    <Sider
      width={200}
      style={{ textAlign: "center", backgroundColor: "#fff", marginTop: "15px" }}
    >
      <Text strong style={{ padding: "16px" }}>
        Collections
      </Text>
      {currentUser === userID || !userID ?
        <Button type="primary" onClick={toggleAddCollectionModal}>
          Manage Collection
        </Button> : null
      }
      <Divider style={{ margin: "10px 0px 5px 0px" }} />
      <Menu>
        {collections.collections.map(({ name, id }) => (
              <Menu.Item key={`${id}`} onClick={() => {
                window.location.assign(routes.collections + '?' + queryString.stringify({ userID: userID, collectionID: id }));
              }}>
                {name}
              </Menu.Item>
            )
          )
        }
      </Menu>
    </Sider>
  );
};

export default CollectionMenu;