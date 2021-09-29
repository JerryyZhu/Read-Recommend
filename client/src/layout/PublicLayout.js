import React, { useEffect} from "react";
import { Row } from "antd";
import routes from "../routes";

const PublicLayout = props => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      // User is logged in. Redirect back to collections
      props.history.push(routes.collections);
      return;
    }
    // Fetch data for logged in user using token
  })

  return (
    <div className="public-container">
      <div style={{ maxWidth: 1200, margin: "auto" }}>
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ paddingTop: 240 }}
        >
          {props.children}
        </Row>
      </div>
    </div>
  );
};

export default PublicLayout;
