import React from "react";

import { Col, Row } from "reactstrap";
import contentData from "../utils/contentData";

export interface ContentProps {}

const Content: React.FC<ContentProps> = () => (
  <div className="next-steps my-5">
    <h2 className="my-5 text-center">What can I do next?</h2>
    <Row className="d-flex justify-content-between">
      {contentData.map((col, i) => (
        <Col key={i} md={5} className="mb-4">
          <h6 className="mb-3">
            <a href={col.link}>{col.title}</a>
          </h6>
          <p>{col.description}</p>
        </Col>
      ))}
    </Row>
  </div>
);

export default Content;
