import React from 'react';
import { Select } from 'antd';

function ADSelect({ className, virtual, ...props }) {
  return <Select className={`${className ?? ''}`} virtual={false} {...props} />;
}

export default ADSelect;
