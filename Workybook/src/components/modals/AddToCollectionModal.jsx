import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetSelectedWorksheets } from '../../app/features/worksheet/worksheetSlice';
import ADModal from '../antd/ADModal';
import ADSteps from '../antd/ADSteps';
import NewCollection from '../steps/collection/NewCollection';

export default function AddToCollectionModal({ onOk, ...props }) {
  const [current, setCurrent] = useState(0);

  const dispatch = useDispatch();

  const afterClose = () => {
    setCurrent(0);
    dispatch(resetSelectedWorksheets());
  };

  const items = [
    {
      title: 'first step',
      content: <NewCollection {...props} />
    }
  ];

  return (
    <ADModal centered afterClose={afterClose} footer={false} width={680} {...props}>
      <ADSteps items={items} current={1} />
      <div className='flex flex-col items-center justify-center'>
        <div className='steps-content'>{items[current].content}</div>
      </div>
    </ADModal>
  );
}
