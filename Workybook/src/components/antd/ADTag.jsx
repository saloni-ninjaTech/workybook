import React from 'react';
import { Tag } from 'antd';

export default function ADTag({ className, success, pill, ...props }) {
  return <Tag className={`${className || ''} ${pill ? 'rounded-full' : ''} ${success ? 'bg-success' : ''} py-1 px-3 min-w-[50px] flex justify-center`} {...props} />;
}
