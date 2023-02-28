import { Spin } from 'antd';
import React from 'react';

function Spinner({ className, full, ...props }) {
  return <Spin className={`${className ?? ''} flex justify-center items-center ${full ? 'h-[851px]' : ''}`} {...props} />;
}

export default Spinner;
