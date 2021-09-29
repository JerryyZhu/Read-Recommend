import React from 'react'
import { Button, Popconfirm, Menu, Dropdown } from "antd";

const CollectionDropdown = ({addBookToCollection, readBool, collections, setCollections, toggleSimilarModal, bookDetail}) => (
  <div>
    <Popconfirm
      title="You cannot unread a book"
      disabled={readBool}
      onConfirm={() => addBookToCollection("read")}
      okText="Mark Read"
      cancelText="Cancel"
    >
      <Button disabled={readBool}>Mark book as read</Button>
    </Popconfirm>
    <Button onClick={toggleSimilarModal}>Find book recommendations</Button>
    <Dropdown
      overlay={
        <Menu>
          {collections.map((collection) => (
            <Menu.Item
              id={collection.id}
              onClick={() => addBookToCollection(collection.id)}
              key={collection.id}
            >
              {collection.name}
            </Menu.Item>
          ))}
        </Menu>
      }
      placement="bottomRight"
      arrow
    >
      <Button>Add to Collection</Button>
    </Dropdown>
  </div>
)

export default CollectionDropdown


