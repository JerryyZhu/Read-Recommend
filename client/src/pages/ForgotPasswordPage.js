import React, { useState } from "react";
import { Card, Form, Input, Typography, Button } from "antd";
import routes from "../routes";
import makeCall from "../axios-calls";

const { Text } = Typography;

const ForgotPasswordPage = props => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  const goToRegisterPage = () => {
    props.history.push(routes.register);
  };
  const onFinish = ({email}) => {
    setLoading(true);
    makeCall('post', 'get_token', {email: email})
    .then(() => {
      setDisabledButton(true);
      setLoading(false);
    })
    .catch(() => {
      setError("Something went wrong while submitting, please try again.")
      console.log(error);
      setLoading(false);
    });
  };
  return (
    <>
      <Card
        bordered={false}
        style={{
          border: "1px solid #dcdcdc",
          boxShadow: "0px 15px 20px 5px #0000001a",
          width: 400
        }}
      >
        <h1 style={{ textAlign: "center" }}>Forgot your password?</h1>
        <Text>Don't worry. Resetting your password is easy, just tell us the email address you registered with.</Text>
        <Form
          hideRequiredMark
          colon={false}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item name="email" rules={[{ type: "email", message: "Please enter a valid email." }, { required: true, message: "Email required" }]}>
            <Input size="large" placeholder="john@example.com" />
          </Form.Item>
          <Button disabled={disabledButton} loading={loading} block size="large" htmlType="submit">
            Send
          </Button>
        </Form>
        <br/>
        <Text>Alternatively make a new account.</Text>
        <Button type="link" onClick={goToRegisterPage}>Sign up</Button>
        <Text type="danger">{error}</Text>
      </Card>
    </>
  );
};

export default ForgotPasswordPage;
