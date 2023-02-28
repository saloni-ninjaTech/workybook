import React from 'react';
import { Modal } from 'antd';

function ADModal({ className, ...props }) {
  return <Modal centered className={`${className ?? ''} rounded-xl`} {...props} />;
}

export default ADModal;
