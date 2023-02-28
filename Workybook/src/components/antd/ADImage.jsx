import React from 'react';
import { Image } from 'antd';

export default function ADImage({ className, children, ...props }) {
  return (
    <Image className={`${className ?? ''}`} referrerPolicy='origin' {...props}>
      {children}
    </Image>
  );
}
ADImage.defaultProps = {
  preview: false
};
