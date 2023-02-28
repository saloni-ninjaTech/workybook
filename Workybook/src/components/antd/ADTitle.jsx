import React from 'react';
import { Typography } from 'antd';

function ADTitle({ className, children, ...props }) {
  const { Title } = Typography;
  return (
    <Title className={`${className ?? ''} !m-0`} {...props}>
      {children}
    </Title>
  );
}

export default ADTitle;
