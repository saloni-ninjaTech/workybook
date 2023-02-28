/* eslint-disable no-return-assign */
import React, { useCallback, useRef, useState } from 'react';
import { Checkbox, Col, Dropdown, Image, Row } from 'antd';
import { EllipsisOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { useDispatch, useSelector } from 'react-redux';
import printIcon from '../../assets/images/icons/print_gray.png';
import assignIcon from '../../assets/images/icons/assign_gray.png';
import folderIcon from '../../assets/images/icons/folder_gray.png';
import shareIcon from '../../assets/images/icons/share_gray.png';
import ADCard from '../antd/ADCard';
import ADButton from '../antd/ADButton';
import dummyImage from '../../assets/images/dummyImage.png';
import ADImage from '../antd/ADImage';
import PrintImages from '../common/PrintImages';
import ShareModal from '../modals/ShareModal';
import AssignModal from '../modals/AssignModal';
import { unSelectCollection, selectCollection, setCurrentCollection } from '../../app/features/collection/collectionSlice';
import CopyToCollectionModal from '../modals/CopyToCollectionModal';
import AssignCollectionModal from '../modals/AssignCollectionModal';

function ThumbnailCard({ className, cardWidth, id, cardChecked, collection, thumbnails = [], favorite, onFavChange, ...props }) {
  const collectionIsLoading = useSelector((state) => state.collection.isLoading);
  const selectedCollections = useSelector((state) => state.collection.selectedCollections);
  const componentRef = useRef();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const showAssignModal = () => {
    setIsAssignModalOpen(true);
  };
  const handleAssignModalOk = () => {
    setIsAssignModalOpen(false);
  };
  const handleAssignModalCancel = () => {
    setIsAssignModalOpen(false);
  };
  const showCollectionModal = () => {
    setIsCollectionModalOpen(true);
  };
  const handleCollectionModalOk = () => {
    setIsCollectionModalOpen(false);
  };
  const handleCollectionModalCancel = () => {
    setIsCollectionModalOpen(false);
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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const items = [
    {
      label: <span className='ml-2'>PRINT</span>,
      key: '1',
      icon: <ADImage width={25} src={printIcon} alt='print' />,
      onClick: handlePrint
    },
    {
      label: <span className='ml-2'>ASSIGN</span>,
      key: '2',
      icon: <ADImage width={25} src={assignIcon} alt='assign' />,
      onClick: showAssignModal
    },
    {
      label: <span className='ml-2'>COPY TO MY COLLECTION</span>,
      key: '3',
      icon: <ADImage width={25} src={folderIcon} alt='copy to my collection' />,
      onClick: showCollectionModal
    },
    {
      label: <span className='ml-2'>SHARE</span>,
      key: '4',
      icon: <ADImage width={25} src={shareIcon} alt='share' />,
      onClick: showShareModal
    }
  ];

  const shareModal = <ShareModal open={isShareModalOpen} onOk={handleShareModalOk} onCancel={handleShareModalCancel} path={[`/collection/${id}`]} multiple />;
  const copyToCollectionModal = <CopyToCollectionModal open={isCollectionModalOpen} onOk={handleCollectionModalOk} onCancel={handleCollectionModalCancel} />;
  // const assignModal = <AssignModal forCollection open={isAssignModalOpen} onOk={handleAssignModalOk} onCancel={handleAssignModalCancel} />;
  const assignCollectionModal = <AssignCollectionModal forCollection={true} open={isAssignModalOpen} onOk={handleAssignModalOk} onCancel={handleAssignModalCancel} />;

  return (
    <>
      {copyToCollectionModal}
      {assignCollectionModal}
      {/* {assignModal} */}
      {shareModal}
      <PrintImages src={thumbnails} ref={componentRef} display={display} />
      <ADCard className={`${className ?? ''} ${cardWidth} bg-slate-200 h-full p-2`} {...props}>
        <ADButton type='text' className='aspect-[16/9] !p-0' block onClick={() => navigate(`/collection/${id}`)}>
          <Row gutter={[8, 8]} className='w-full h-full'>
            {thumbnails && thumbnails?.length ?
              thumbnails.slice(0, 4).map((item, index) => (
                <Col key={index} xs={24} sm={12}>
                  <Image onError={(e) => (e.target.src = dummyImage)} preview={false} src={item} className='rounded-md aspect-[16/9] object-cover w-full' />
                </Col>
              )) :
              null}
          </Row>
        </ADButton>
        <div className='flex justify-between items-center py-2'>
          <Checkbox
            checked={selectedCollections?.includes(collection?._id)}
            onChange={useCallback(
              (e) => {
                if (e.target.checked) {
                  dispatch(selectCollection(collection?._id));
                } else {
                  dispatch(unSelectCollection(collection?._id));
                }
              },
              [collection]
            )}
          />
          <div className='flex items-center'>
            <ADButton className='!p-0 !border-0 text-xl !focus:bg-transparent !active:bg-transparent !hover:bg-transparent' type='text' onClick={onFavChange}>
              {favorite ? <HeartFilled className='text-primary' /> : <HeartOutlined className='text-info' />}
            </ADButton>
          </div>
          <Dropdown
            onClick={() => dispatch(setCurrentCollection(collection))}
            trigger={['click']}
            menu={{
              items
            }}
            placement='topLeft'
            arrow
          >
            <div className='rounded-full border-solid border-2 border-slate-300 flex cursor-pointer'>
              <EllipsisOutlined className='text-[18px] text-medium p-px text-gray-400' />
            </div>
          </Dropdown>
        </div>
        <div>{collection?.title}</div>
        <div className='flex justify-between'>
          <div className='text-xs text-slate-400'>
            By
            {' '}
            {collection?.added_by?.firstName}
            {' '}
            {collection?.added_by?.lastName}
          </div>
          <div className='text-xs text-slate-400'>{`${thumbnails?.length} Worksheets`}</div>
        </div>
      </ADCard>
    </>
  );
}

ThumbnailCard.defaultProps = {
  className: '',
  cardWidth: 'w-full',
  cardChecked: false,
  favorite: false
};
export default ThumbnailCard;
