import React, { useState } from "react";
import { Card, Form, Input, notification, Typography, Button } from "antd";
import routes from "../routes";
import makeCall from "../axios-calls";

import { useParams } from "react-router-dom";
const { Text } = Typography;

const RecoverPage = props => {
  const { tokenId } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const displaySuccess = (message) => {
    notification['success']({
      message,
      placement: 'bottomLeft',
    })
  }

  const onFinish = ({password}) => {
    setLoading(true);
    makeCall('post', 'reset_password', {password, token: tokenId})
    .then(() => {
      props.history.push(routes.login);
      displaySuccess("Password reset! Please login.");
      setLoading(false);
    })
    .catch(() => {
      setError("Something went wrong while trying to reset password.")
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
        <h1 style={{ textAlign: "center" }}>Submit a new password</h1>
        <Form
          hideRequiredMark
          colon={false}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password required" }]}>
            <Input.Password
              size="large"
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ required: true, message: "Confirm password required" }, ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            }
          })]}>
            <Input.Password
              size="large"
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Button loading={loading} block size="large" htmlType="submit">
            Reset
          </Button>
        </Form>
        <br/>
        <Text type="danger">{error}</Text>
      </Card>
    </>
  );
};

export default RecoverPage;
