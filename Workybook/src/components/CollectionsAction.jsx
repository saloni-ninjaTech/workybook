import React, { useState } from 'react';
import { Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ADImage from './antd/ADImage';
import ADButton from './antd/ADButton';
import printIcon from '../assets/images/icons/print.png';
import folderIcon from '../assets/images/icons/folder.png';
import assignIcon from '../assets/images/icons/assign.png';
import shareIcon from '../assets/images/icons/share.png';
import AssignModal from './modals/AssignModal';
import { setCurrentStep } from '../app/features/assignment/assignmentSlice';
import CopyToCollectionModal from './modals/CopyToCollectionModal';
import AssignCollectionModal from './modals/AssignCollectionModal';

export function CollectionsAction() {
  const selectedCollections = useSelector((state) => state.collection.selectedCollections);

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isCopyToCollectionModalOpen, setIsCopyToCollectionModalOpen] = useState(false);

  const dispatch = useDispatch();

  const addToAssignmentHandler = () => {
    setIsAssignModalOpen(true);
  };

  const handleAssignModalOk = () => {
    setIsAssignModalOpen(false);
    dispatch(setCurrentStep(0));
  };

  const handleAssignModalCancel = () => {
    setIsAssignModalOpen(false);
  };

  const showCopyToCollectionModal = () => {
    setIsCopyToCollectionModalOpen(true);
  };

  const onCopyToCollectionModalOk = () => {
    setIsCopyToCollectionModalOpen(false);
  };

  const onCopyToCollectionModalCancel = () => {
    setIsCopyToCollectionModalOpen(false);
  };

  const items = [
    {
      icon: printIcon,
      name: 'PRINT'
    },
    {
      icon: assignIcon,
      name: 'ASSIGN',
      onClick: addToAssignmentHandler
    },
    {
      icon: folderIcon,
      name: 'COPY TO COLLECTION',
      onClick: showCopyToCollectionModal
    },
    {
      icon: shareIcon,
      name: 'SHARE'
    }
  ];

  const assignCollectionModal = <AssignCollectionModal open={isAssignModalOpen} onOk={handleAssignModalOk} onCancel={handleAssignModalCancel} />;
  const copyToCollectionModal = <CopyToCollectionModal open={isCopyToCollectionModalOpen} onOk={onCopyToCollectionModalOk} onCancel={onCopyToCollectionModalCancel} />;

  return (
    <div className={`fixed flex justify-center items-center w-full bottom-[70px] ${selectedCollections?.length ? 'block' : 'hidden'}`}>
      {assignCollectionModal}
      {copyToCollectionModal}
      {assignCollectionModal}
      <div className='w-full max-w-[536px] h-[54px] bg-blue-800 rounded-full flex justify-center items-center'>
        <Space size='middle'>
          {items.map(({ icon, name, onClick }) => (
            <ADButton key={name} type='text' className='text-info gap-2 !p-0 flex hover:text-white active:text-white focus:text-white' icon={<ADImage src={icon} alt='print' />} onClick={onClick}>
              {name}
            </ADButton>
          ))}
        </Space>
      </div>
    </div>
  );
}
