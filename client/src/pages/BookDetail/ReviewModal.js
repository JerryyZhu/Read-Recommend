import React from "react";
import { Form, Button, Rate, Input, Modal, Card } from "antd";


const ReviewModal = ({loading, onFinish, visible, toggleVisible, userReview}) => (
  <Modal
    visible={visible}
    title={userReview ? "Edit your review" : "Submit a review"}
    onCancel={toggleVisible}
    width={768}
    footer={[
      <Button key="back" onClick={toggleVisible}>
        Return
      </Button>,
      <Button
        form="review_form"
        key="submit"
        type="primary"
        htmlType="submit"
        loading={loading}
      >
        Submit
      </Button>,
    ]}
  >
    <Card>
      <Form
        hideRequiredMark
        id="review_form"
        onFinish={onFinish}
        initialValues={{
          'review': userReview && userReview.review ? userReview.review : "",
          'rating': userReview ? userReview.rating : 5
        }}
      >
        <Form.Item
          label="My rating"
          name="rating"
          rules={[{ required: true, message: "Rating required" }]}
        >
          <Rate />
        </Form.Item>

        <Form.Item
          name="review"
          rules={[{ required: true, message: "Please enter a review" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Card>
  </Modal>
);

export default ReviewModal;
