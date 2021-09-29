import React from 'react'
import { Result } from "antd";

const ErrorPage = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
  />
)

export default ErrorPage
