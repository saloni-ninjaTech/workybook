import { Row, Col } from 'antd';
import React from 'react';

export function Temp() {
  return (
    <div className='border-primary border-solid primary-border'>
      <Row>
        <Col md={12} xs={24}>
          col-1
        </Col>
        <Col md={12} xs={24}>
          col-2
        </Col>
      </Row>
    </div>
  );
}
