import React, { useState } from "react";
import { Card, Form, Input, Typography, Button } from "antd";
import routes from "../routes";
import makeCall from "../axios-calls";

const { Text } = Typography;

const LoginPage = props => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const goToRegisterPage = () => {
    props.history.push(routes.register);
  };
  const goToForgotPasswordPage = () => {
    props.history.push(routes.forgotpassword);
  };
  const onFinish = ({email, password}) => {
    setLoading(true);
    makeCall('post', 'login/', {username: email, password})
    .then(function (response) {
      if (response.data.code !== 200) {
        setError(response.data.error)
      }
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userID", response.data.user.id);
        props.history.push(routes.collections);
      }
      setLoading(false);
    })
    .catch(function (error) {
      if (error.response.status === 400) {
        setError("Username and password do not match or you do not have an account yet.")
      } else {
        setError("Something went wrong while trying to login.")
      }
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
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <Form
          hideRequiredMark
          colon={false}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item label="Email" name="email" rules={[{ type: "email", message: "Please enter a valid email." }, { required: true, message: "Email required" }]}>
            <Input size="large" placeholder="john@example.com" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password required" }]}>
            <Input.Password
              size="large"
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Button loading={loading} block size="large" htmlType="submit">
            Login
          </Button>
        </Form>
        <Text>Not a member?</Text>
        <Button type="link" onClick={goToRegisterPage}>Sign up</Button>
        <br/>
        <Button type="link" onClick={goToForgotPasswordPage}>Forgot Password?</Button>
        <Text type="danger">{error}</Text>
      </Card>
    </>
  );
};

export default LoginPage;
