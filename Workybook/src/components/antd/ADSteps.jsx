import React from 'react';
import { Steps } from 'antd';

function ADSteps({ className, showSteps, ...props }) {
  return (
    <Steps className={`${className ?? ''} ${!showSteps && 'hidden'}`} {...props}>
      Hello
    </Steps>
  );
}

export default ADSteps;
