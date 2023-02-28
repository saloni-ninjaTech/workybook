import React, { useState } from 'react';
import ADModal from '../antd/ADModal';
import ADSteps from '../antd/ADSteps';
import EditClass from '../steps/editClass/EditClass';
import ClassUpdated from '../steps/editClass/ClassUpdated';

export default function EditClassModal({ onOk, onShow, ...props }) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const afterClose = () => {
    setCurrent(0);
  };

  const items = [
    {
      title: 'first step',
      content: <EditClass next={next} />
    },
    {
      title: 'second step',
      content: <ClassUpdated onOk={onOk} />
    }
  ];

  return (
    <ADModal centered afterClose={afterClose} footer={false} {...props}>
      <ADSteps items={items} current={1} />
      <div className='flex flex-col items-center justify-center'>
        <div className='steps-content'>{items[current].content}</div>
      </div>
    </ADModal>
  );
}
