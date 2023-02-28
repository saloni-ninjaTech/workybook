import React from 'react';
import { Card } from 'antd';

export default function ADCard({ className, children, ...props }) {
  return (
    <Card className={`${className ?? ''}`} {...props}>
      {children}
    </Card>
  );
}
