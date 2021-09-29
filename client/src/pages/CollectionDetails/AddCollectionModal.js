import React from 'react';
import { Modal, Button, Select, Space, Form, Input, Tabs } from 'antd';

const { Option } = Select;

const { TabPane } = Tabs;

const AddCollectionModal = ({ loading, onFinishAdd, onFinishDelete, visible, toggleVisible, collections }) => (
    <Modal
      visible={visible}
      title="Manage Collection"
      onCancel={toggleVisible}
      width={384}
      footer={null}
    >
    <Tabs type="card">
      <TabPane tab="Add Collection" key="2">
        <Form
          hideRequiredMark
          id="add_form"
          onFinish={onFinishAdd}
        >
          <Form.Item
            labelCol={{ span: 24 }}
            label="Collection Name"
            name="name"
            rules={[{ required: true, message: 'Please enter a collection name' }]}
          >
            <Input />
          </Form.Item>
        </Form>
        <Space>
          <Button key="back" onClick={toggleVisible}>
            Return
          </Button>
          <Button
            form="add_form"
            key="submit"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Add
          </Button>
        </Space>
      </TabPane>
      <TabPane tab="Delete Collection" key="1">
        <Form
          hideRequiredMark
          id="delete_form"
          onFinish={onFinishDelete}
        >
          <Form.Item
            labelCol={{ span: 24 }}
            name="id"
            rules={[{ required: true, message: 'Please select a collection' }]}
          >
            <Select>
              {collections.collections
                  .filter(({name}) => name !== 'All')
                  .map(({ name, id }) => (
                    <Option key={id} value={id}>{name}</Option>
                  )
              )}
            </Select>
          </Form.Item>
        </Form>
        <Space>
          <Button key="back" onClick={toggleVisible}>
            Return
          </Button>
          <Button
            form="delete_form"
            key="submit"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Delete
          </Button>
        </Space>
      </TabPane>
    </Tabs>

    </Modal>
  );

export default AddCollectionModal;
