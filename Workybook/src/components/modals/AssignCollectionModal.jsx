import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAssignments, setAssignCollectionCurrentStep } from '../../app/features/assignment/assignmentSlice';
import { resetSelectedCollections } from '../../app/features/collection/collectionSlice';
import ADModal from '../antd/ADModal';
import ADSteps from '../antd/ADSteps';
import AssignStep2 from '../steps/assign/AssignStep2';
import AssignStep3 from '../steps/assign/AssignStep3';
import NewAssignment from '../steps/assign/NewAssignment';
import AssignCollectionStep1 from '../steps/AssignCollectionStep1';

function AssignCollectionModal({ onOk, inDetail, ...props }) {
  const assignCollectionCurrentStep = useSelector((state) => state.assignment.assignCollectionCurrentStep);
  const dispatch = useDispatch();

  const next = () => {
    dispatch(setAssignCollectionCurrentStep(assignCollectionCurrentStep + 1));
  };

  const afterClose = () => {
    dispatch(getAssignments());
  };

  const onClose = () => {
    dispatch(resetSelectedCollections());
    onOk();
  };

  const onChangeHandler = (e) => {
    if (inDetail) {
      if (e !== 1) {
        dispatch(setAssignCollectionCurrentStep(e));
      }
    }
  };

  const items = [
    {
      title: 'Create New',
      content: <NewAssignment next={next} onOk={onOk} {...props} />
    },
    {
      title: 'Select Items',
      icon: <>1</>,
      content: <AssignCollectionStep1 inDetail={inDetail} next={next} onClose={onClose} onOk={onOk} {...props} />
    },
    {
      title: 'Select Students',
      icon: <>2</>,
      content: <AssignStep2 inDetail={inDetail} next={next} onClose={onClose} onOk={onOk} {...props} />
    },
    {
      title: 'Set Assignment Details',
      icon: <>3</>,
      content: <AssignStep3 inDetail={inDetail} onOk={onOk} onClose={onClose} onCancel={onClose} {...props} />
    }
  ];

  return (
    <ADModal centered afterClose={afterClose} closable={false} footer={null} width={680} {...props}>
      <ADSteps items={items} current={assignCollectionCurrentStep} showSteps={assignCollectionCurrentStep !== 0} className='custom-assign-steps' />
      <div className='flex flex-col items-center justify-center'>
        <div className='steps-content max-w-[600px]'>{items[assignCollectionCurrentStep]?.content}</div>
      </div>
    </ADModal>
  );
}

export default AssignCollectionModal;

AssignCollectionModal.defaultProps = {
  inDetail: false
};
