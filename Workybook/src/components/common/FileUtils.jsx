import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import printIcon from '../../assets/images/icons/print.png';
import folderIcon from '../../assets/images/icons/folder.png';
import assignIcon from '../../assets/images/icons/assign.png';
import shareIcon from '../../assets/images/icons/share.png';
import ADImage from '../antd/ADImage';
import ADButton from '../antd/ADButton';
import { createCollection, getCollections, updateCollection } from '../../app/features/collection/collectionSlice';
import AddToCollectionModal from '../modals/AddToCollectionModal';
import AssignModal from '../modals/AssignModal';
import ShareModal from '../modals/ShareModal';
import { setCurrentStep } from '../../app/features/assignment/assignmentSlice';
import PrintImages from './PrintImages';

function FileUtils({ show = false }) {
  const selectedWorksheets = useSelector((state) => state.worksheet.selectedWorksheets);
  const worksheets = useSelector((state) => state.worksheet.worksheets?.list);
  const { classes, isLoading, currentClass, currentCreateClass } = useSelector((state) => state.classroom);

  const resultPrint = useMemo(() => {
    let final = [];
    selectedWorksheets?.map((item) => {
      const b = worksheets.find((a) => a._id === item);
      final = [...final, b?.thumbnail];
      return final;
    });
    return final;
  }, [selectedWorksheets]);

  const componentRef = useRef();
  const paths = useMemo(() => {
    const result = selectedWorksheets.map((item) => `/my-library/worksheet/${item}`);
    return result;
  }, [selectedWorksheets]);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const dispatch = useDispatch();

  const addToCollectionHandler = () => {
    setIsCollectionModalOpen(true);
  };

  const showCollectionModal = () => {
    dispatch(getCollections());
    setIsCollectionModalOpen(true);
  };

  const handleCollectionModalOk = (val) => {
    if (val) {
      const data = {
        title: val,
        favorite: false,
        content: selectedWorksheets,
        added_by: user?.data?.user?._id
      };
      dispatch(createCollection(data));
      dispatch(updateCollection());
      setIsCollectionModalOpen(false);
      setRerender(Math.random());
    }
  };

  const handleCollectionModalCancel = () => {
    setIsCollectionModalOpen(false);
  };

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

  const handleShareModalOk = () => {
    setIsShareModalOpen(false);
  };
  const handleShareModalCancel = () => {
    setIsShareModalOpen(false);
  };
  const showShareModal = () => {
    setIsShareModalOpen(true);
  };

  const addToCollection = <AddToCollectionModal closable={false} open={isCollectionModalOpen} onShow={showCollectionModal} onOk={handleCollectionModalOk} onCancel={handleCollectionModalCancel} />;
  const assignModal = <AssignModal open={isAssignModalOpen} onOk={handleAssignModalOk} onCancel={handleAssignModalCancel} />;
  const shareModal = <ShareModal open={isShareModalOpen} onOk={handleShareModalOk} onCancel={handleShareModalCancel} path={paths} multiple />;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  return (
    <div className={`w-full fixed ${show ? 'show-print-box' : 'hide-print-box'} h-[54px] text-center block flex items-center justify-center bottom-print`}>
      {addToCollection}
      {assignModal}
      {shareModal}
      <PrintImages src={resultPrint} ref={componentRef} />
      <div className='w-full max-w-[536px] flex h-[54px] bg-blue-800 rounded-[27px] items-center justify-center px-[30px]'>
        <div className='w-full h-full flex flex-row justify-between'>
          <ADButton type='text' className='!p-0 gap-[10px]' onClick={handlePrint}>
            <ADImage src={printIcon} alt='print' />
            <Typography.Text className='font-normal text-white'>PRINT</Typography.Text>
          </ADButton>
          {(classes?.list?.length > 0) && (
          <ADButton type='text' className='!p-0 gap-[10px]' onClick={addToAssignmentHandler}>
            <ADImage src={assignIcon} alt='assign' />
            <Typography.Text className='font-normal text-white'>ASSIGN</Typography.Text>
          </ADButton>
          )}
          <ADButton type='text' className='!p-0 gap-[10px]' onClick={addToCollectionHandler}>
            <ADImage src={folderIcon} alt='addToCollection' />
            <Typography.Text className='font-normal text-white'>ADD TO COLLECTION</Typography.Text>
          </ADButton>
          <ADButton type='text' className='!p-0 gap-[10px]' onClick={showShareModal}>
            <ADImage src={shareIcon} alt='share' />
            <Typography.Text className='font-normal text-white'>SHARE</Typography.Text>
          </ADButton>
        </div>
      </div>
    </div>
  );
}

export default FileUtils;
