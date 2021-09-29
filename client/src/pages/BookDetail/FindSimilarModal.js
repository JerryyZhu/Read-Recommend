import React from "react";
import { Form, Button, Checkbox, Modal } from "antd";

const FindSimilarModal = ({ bookId, visible, toggleVisible }) => (
  <Modal
    visible={visible}
    title="Find Books Recommendations by Modes"
    onCancel={toggleVisible}
    width={256}
    footer={[
      <Button key="back" onClick={toggleVisible}>
        Return
      </Button>,
      <Button
        form="find_similar_form"
        key="submit"
        type="primary"
        htmlType="submit"
      >
        Find
      </Button>,
    ]}
  >
    <Form
      hideRequiredMark
      id="find_similar_form"
      onFinish={value => {
        window.location.assign(`
          /similar-books/${bookId}/${value.options.join('-')}
        `)
      }}
    >
      <Form.Item name="options">
        <Checkbox.Group>
          <Checkbox value="word">By Word Count</Checkbox>
          <br />
          <Checkbox value="author">By Author</Checkbox>
          <br />
          <Checkbox value="genre">By Genre</Checkbox>
          <br />
          <Checkbox value="rating">By Rating</Checkbox>
          <br />
          <Checkbox value="popularity">By Popularity</Checkbox>
          <br />
          <Checkbox value="year">By Year</Checkbox>
        </Checkbox.Group>
      </Form.Item>
    </Form>
  </Modal>
);

export default FindSimilarModal;
