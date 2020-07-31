// @flow
import React from 'react';
import { withAuth } from '../HOCs/withAuth';
import { Row, Col } from 'antd';
function Home() {
  return (
    <Row
      style={{
        height:"100vh",
      }}
      justify = "center"
      align = "middle"
    >
      <Col offset={8} span={8}>홍옴</Col>
    </Row>
  );
};
export default withAuth(Home, true);