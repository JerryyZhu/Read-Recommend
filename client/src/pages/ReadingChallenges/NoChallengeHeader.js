import React from "react";
import { Alert, Typography, Form, InputNumber, Button } from "antd";

const { Title, Paragraph } = Typography;

const validateMessages = {
  number: {
    // eslint-disable-next-line
    range: 'Number of books must be between ${min} and ${max}',
  },
};

const NoChallengeHeader = ({startChallenge, challengeLoading}) => (
  <div>
    <Title level={4}>30 Day Reading Challenge</Title>
    <Paragraph>
        You currently do not have a reading challenge.
    </Paragraph>
    <Form
      hideRequiredMark
      id="set_challenge_form"
      onFinish={values => startChallenge(values.target)}
      validateMessages={validateMessages}
    >
      <Form.Item name="target" label="Books: " rules={[{ required: true, message: "Goal required"}, { type: 'number', min: 1, max: 99 }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item>
        <Button 
          type="primary"
          disabled={false}
          loading={challengeLoading}
          form="set_challenge_form"
          key="submit"
          htmlType="submit"
          >
          Start Challenge
        </Button>
      </Form.Item>
    </Form>
    <Alert showIcon message="This will start a challenge for 30 days. You won't be able to revert your challenge or start another one for this duration." type="warning" />
  </div>
)

export default NoChallengeHeader;