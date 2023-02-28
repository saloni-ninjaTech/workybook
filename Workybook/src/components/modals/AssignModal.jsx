import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAssignments, setCurrentStep } from '../../app/features/assignment/assignmentSlice';
import { resetSelectedWorksheets } from '../../app/features/worksheet/worksheetSlice';
import ADModal from '../antd/ADModal';
import ADSteps from '../antd/ADSteps';
import AssignStep1 from '../steps/assign/AssignStep1';
import AssignStep2 from '../steps/assign/AssignStep2';
import AssignStep3 from '../steps/assign/AssignStep3';
import NewAssignment from '../steps/assign/NewAssignment';

function AssignModal({ forCollection, onOk, ...props }) {
  const currentStep = useSelector((state) => state.assignment.currentStep);
  const currentAssignment = useSelector((state) => state.assignment.currentAssignment?.assignment);
  const dispatch = useDispatch();

  const next = () => {
    dispatch(setCurrentStep(currentStep + 1));
  };

  const afterClose = () => {
    dispatch(getAssignments());
  };

  const onClose = () => {
    dispatch(setCurrentStep(0));
    dispatch(resetSelectedWorksheets());
    onOk();
  };

  const items = [
    {
      title: 'Create New',
      content: <NewAssignment next={next} onOk={onOk} {...props} />
    },
    {
      title: 'Select Items',
      icon: <>1</>,
      content: <AssignStep1 next={next} onClose={onClose} onOk={onOk} {...props} />
    },
    {
      title: 'Select Students',
      icon: <>2</>,
      content: <AssignStep2 next={next} onClose={onClose} onOk={onOk} {...props} />
    },
    {
      title: 'Set Assignment Details',
      icon: <>3</>,
      content: <AssignStep3 onOk={onOk} onClose={onClose} {...props} />
    }
  ];

  return (
    <ADModal centered afterClose={afterClose} closable={false} footer={null} width={680} {...props}>
      <ADSteps items={items} current={currentStep} showSteps={currentStep !== 0} className='custom-assign-steps' />
      <div className='flex flex-col items-center justify-center'>
        <div className='steps-content max-w-[600px]'>{items[currentStep]?.content}</div>
      </div>
    </ADModal>
  );
}

export default AssignModal;
