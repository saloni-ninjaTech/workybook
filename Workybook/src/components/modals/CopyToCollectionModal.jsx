import React, { useState } from 'react';
import ADModal from '../antd/ADModal';
import ADSteps from '../antd/ADSteps';
import CopyCollection from '../steps/collection/CopyCollection';

export default function CopyToCollectionModal({ onOk, ...props }) {
  const [current, setCurrent] = useState(0);

  const afterClose = () => {
    setCurrent(0);
  };

  const items = [
    {
      title: 'first step',
      content: <CopyCollection {...props} />
    }
  ];

  return (
    <ADModal centered afterClose={afterClose} closable={false} footer={false} width={680} {...props}>
      <ADSteps items={items} current={1} />
      <div className='flex flex-col items-center justify-center'>
        <div className='steps-content'>{items[current].content}</div>
      </div>
    </ADModal>
  );
}
