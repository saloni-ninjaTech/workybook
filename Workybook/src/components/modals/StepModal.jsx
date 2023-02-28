import { Modal, Steps } from 'antd';
import React from 'react';
import ADButton from '../antd/ADButton';
import ADTitle from '../antd/ADTitle';
import AssignStep1 from '../steps/assign/AssignStep1';
import AssignStep2 from '../steps/assign/AssignStep2';
import AssignStep3 from '../steps/assign/AssignStep3';

function StepModal({ nextStep, prevStep, currentStep, ...props }) {
  const { Step } = Steps;

  const steps = [
    {
      title: 'Select Items',
      content: <AssignStep1 />
    },
    {
      title: 'Select Students',
      content: <AssignStep2 onAssignClass={nextStep} onAssignSelected={nextStep} />
    },
    {
      title: 'Select Assignment Details',
      content: <AssignStep3 />
    }
  ];

  return (
    <Modal className='rounded-xl' centered footer={false} {...props}>
      <ADTitle level={3} className='text-center text-danger pb-8'>
        Create New Assign Activities
      </ADTitle>
      <Steps current={currentStep}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className='steps-content'>{steps[currentStep]?.content}</div>
      <div className='steps-action'>
        {currentStep === 0 && (
          <div className='flex justify-between'>
            <ADButton size='large' type='danger' onClick={nextStep}>
              CANCEL
            </ADButton>
            <ADButton size='large' type='primary' onClick={nextStep}>
              ADD MORE ITEMS
            </ADButton>
            <ADButton size='large' type='primary' onClick={nextStep}>
              ASSIGN
            </ADButton>
          </div>
        )}
        {currentStep === 1 && (
          <div className='flex justify-between'>
            <ADButton size='large' type='danger' onClick={nextStep}>
              CANCEL
            </ADButton>
            <ADButton size='large' type='primary' onClick={prevStep}>
              BACK
            </ADButton>
          </div>
        )}
        {currentStep === 2 && (
          <div className='flex justify-between'>
            <ADButton size='large' type='danger' onClick={nextStep}>
              CANCEL
            </ADButton>
            <ADButton size='large' type='primary' onClick={prevStep}>
              BACK
            </ADButton>
            <ADButton size='large' type='primary' onClick={() => setIsStepModalOpen(false)}>
              ASSIGN
            </ADButton>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default StepModal;
