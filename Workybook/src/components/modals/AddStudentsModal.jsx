import React, { useState } from 'react';
import ADModal from '../antd/ADModal';
import ADSteps from '../antd/ADSteps';
import CreateClassAddStudents from '../steps/createClass/CreateClassAddStudents';
import StudentsAdded from '../steps/StudentsAdded';

function AddStudentsModal({ onOk, ...props }) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent(current + 1);

  const items = [
    {
      title: 'add students',
      content: <CreateClassAddStudents next={next} />
    },
    {
      title: 'students added',
      content: <StudentsAdded onClose={onOk} />
    }
  ];

  return (
    <ADModal centered footer={false} onOk={onOk} afterClose={() => setCurrent(0)} {...props}>
      <ADSteps items={items} current={1} />
      <div className='flex flex-col items-center justify-center'>
        <div className='steps-content'>{items[current].content}</div>
      </div>
    </ADModal>
  );
}

export default AddStudentsModal;
