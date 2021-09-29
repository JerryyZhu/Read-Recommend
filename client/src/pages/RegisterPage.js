import React, { useState } from "react";
import { Card, Form, Input, Typography, Button } from "antd";
import routes from "../routes";
import makeCall from "../axios-calls"

const { Text } = Typography;

const RegisterPage = props => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const goToLoginPage = () => {
    props.history.push(routes.login);
  };
  const onFinish = ({firstName, lastName, email, password}) => {
    setLoading(true);
    makeCall('post', 'user/register', {first_name: firstName, last_name: lastName, email, password})
    .then(function (response) {
      localStorage.setItem("token", response.data.token);
      props.history.push(routes.collections);
      setLoading(false);
    })
    .catch(function (error) {
      if (error.response.status === 403) {
        setError("Username already exists, please try a different username.")
      } else {
        setError("Something when wrong while trying to register, please try again.")
      }
      setLoading(false);
      console.log(error);
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
        <h1 style={{ textAlign: "center" }}>Create a new account</h1>
        <Form
          hideRequiredMark
          colon={false}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "First name required" }]}>
            <Input size="large" placeholder="John" />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Last name required" }]}>
            <Input size="large" placeholder="Smith" />
          </Form.Item>
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
            Register
          </Button>
        </Form>
        <Text>Already a member?</Text>
        <Button type="link" onClick={goToLoginPage}>Sign in</Button>
        <br/>
        <Text type="danger">{error}</Text>
      </Card>
    </>
  );
};

export default RegisterPage;
