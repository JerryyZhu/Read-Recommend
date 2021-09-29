import React from "react";
import { Form, Button, Input, Modal, Card, Select, Typography } from "antd";

const { Text } = Typography;
const { Option } = Select;

const RecommendationModal = ({ loading, onFinish, visible, toggleVisible, userRecommendation, readCollection, bookId }) => (
  <Modal
    visible={visible}
    title={userRecommendation && userRecommendation.target ? "Edit your recommendation" : "Submit a recommendation"}
    onCancel={toggleVisible}
    width={768}
    footer={[
      <Button key="back" onClick={toggleVisible}>
        Return
          </Button>,
      <Button
        form="recommendation_form"
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
        id="recommendation_form"
        onFinish={onFinish}
        initialValues={{
          'reason': userRecommendation && userRecommendation.reason ? userRecommendation.reason : "",
          'targetBook': userRecommendation && userRecommendation.target ? userRecommendation.target.id : "",
        }}
      >
        <Text>Choose a similiar book that you have read</Text>
        <Form.Item
          name="targetBook"
          rules={[{ required: true, message: "Similar book required" }]}
        >
          <Select showSearch optionFilterProp="children" value={ userRecommendation && userRecommendation.target ? userRecommendation.target.title : null}>
            {readCollection.books.filter(({id}) => Number(id) !== Number(bookId)).map(({ title, id }) => (
                <Option selected={ userRecommendation && userRecommendation.target && userRecommendation.target.id === id ? true : false} value={id} key={`book-modal-${id}`}>{title}</Option>
              )
            )}
          </Select>

        </Form.Item>

        <Text>Comment</Text>
        <Form.Item
          name="reason"
          rules={[{ required: true, message: "Please enter a comment" }]}
        >
          <Input.TextArea rows={4} value={userRecommendation ? userRecommendation.reason: null}/>
        </Form.Item>
      </Form>
    </Card>
  </Modal>
)

export default RecommendationModal;
