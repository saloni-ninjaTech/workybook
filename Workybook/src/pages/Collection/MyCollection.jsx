import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Col, Row, Space, Tooltip } from 'antd';
import { FaPrint } from 'react-icons/fa';
import { MdAssignmentTurnedIn } from 'react-icons/md';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { getCollection, setCurrentCollection } from '../../app/features/collection/collectionSlice';
import MainLayout from '../../components/layout/MainLayout';
import CardComponent from '../../components/common/CardComponent';
import shareIcon from '../../assets/images/icons/share_gray.png';
import ADTitle from '../../components/antd/ADTitle';
import ADButton from '../../components/antd/ADButton';
import ADImage from '../../components/antd/ADImage';
import PrintImages from '../../components/common/PrintImages';
import ShareModal from '../../components/modals/ShareModal';
import AssignModal from '../../components/modals/AssignModal';
import { setAssignCollectionCurrentStep, setAssignment } from '../../app/features/assignment/assignmentSlice';
import AssignCollectionModal from '../../components/modals/AssignCollectionModal';
import Spinner from '../../components/spinner/Spinner';

function MyCollection() {
  const { user } = useSelector((state) => state.auth);
  const assignments = useSelector((state) => state.assignment.assignments);

  const authToken = user?.payload?.verification?.token;
  const { id } = useParams();
  const componentRef = useRef();
  const [rerender, setRerender] = useState(0);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { currentCollection, isLoading } = useSelector((state) => state.collection);
  const collections = useSelector((state) => state.collection.collections?.list);
  const collectionInfo = currentCollection;
  const worksheetList = collectionInfo?.content || [];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(
        getCollection({
          id
        })
      );
    }
  }, [id, rerender]);

  useEffect(() => {
    const cc = collections.find((c) => c._id === id);
    dispatch(setCurrentCollection(cc));
  }, [id]);

  const printList = useMemo(() => {
    const thumbnails = worksheetList.map((item) => item.thumbnail);
    return thumbnails;
  }, [worksheetList]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });
  const handleShareModalCancel = () => {
    setIsShareModalOpen(false);
  };

  const showAssignModal = () => {
    setIsAssignModalOpen(true);
  };

  const handleAssignModalOk = () => {
    setIsAssignModalOpen(false);
    dispatch(setAssignCollectionCurrentStep(0));
  };

  const handleAssignModalCancel = () => {
    setIsAssignModalOpen(false);
    dispatch(setAssignCollectionCurrentStep(0));
  };

  const paths = useMemo(() => {
    const result = worksheetList.map((item) => `/my-library/worksheet/${item?._id}`);
    return result;
  }, [worksheetList]);

  const shareModal = <ShareModal open={isShareModalOpen} onOk={handleShareModalCancel} onCancel={handleShareModalCancel} path={paths} multiple />;
  const assignCollectionModal = <AssignCollectionModal inDetail closable={false} open={isAssignModalOpen} onOk={handleAssignModalOk} onCancel={handleAssignModalCancel} />;

  return (
    <MainLayout>
      {assignCollectionModal}
      {shareModal}
      {/* {isLoading ? (
        <Spinner />
      ) : ( */}
      <>
        <div className='px-8 pb-4 pt-4'>
          <Row gutter={16} className='pb-4 border-1 border-solid border-x-0 border-t-0'>
            <Col xs={24} md={12}>
              <ADButton onClick={() => navigate(-1)} type='link' className='!p-0'>
                <div>{'< MY COLLECTIONS'}</div>
              </ADButton>
              <ADTitle level={3}>{collectionInfo?.title}</ADTitle>
              <div className='py-3 flex text-xs'>
                <div className='pr-16'>
                  By
                  {' '}
                  {collectionInfo?.added_by?.firstName}
                  {' '}
                  {collectionInfo?.added_by?.lastName}
                </div>
                <div>{`${worksheetList?.length} Worksheets`}</div>
              </div>
              <Space size='large' className='pt-1'>
                <ADTitle level={5}>Standards</ADTitle>
                {collectionInfo?.std_topic?.slice(0, 4).map((item, i) => (
                  <div className='w-[80px] text-center bg-gray-200'>{item}</div>
                ))}
                {
                  collectionInfo?.std_topic?.length > 4 && (

                  <Tooltip title={collectionInfo?.std_topic?.slice(4, collectionInfo?.std_topic?.length).filter((el) => el !== '').join('\r\n')}>
                    <div
                      className='w-[80px] text-center bg-gray-200 cursor-pointer'
                    >
                      <span> ...</span>

                    </div>
                  </Tooltip>

                  )
                }
              </Space>
            </Col>
            <PrintImages ref={componentRef} src={printList} />

            <Col xs={24} md={12} className='flex justify-end items-end'>
              <Space>
                <Row gutter={16} className='text-gray-400'>
                  <Col
                    xs={24}
                    lg={8}
                    className='flex items-center border-y-0 border-l-0 border-solid'
                    onClick={handlePrint}
                    style={{
                      cursor: 'pointer'
                    }}
                  >
                    <div className='text-2xl mr-2 flex'>
                      <FaPrint />
                    </div>
                    <div className='text-xs text-gray-500'>PRINT</div>
                  </Col>
                  <Col xs={24} lg={8} className='flex items-center border-y-0 border-l-0 border-solid'>
                    <ADButton type='text' className='text-2xl mr-3 flex !p-0 text-gray-400 hover:text-gray-500' onClick={showAssignModal}>
                      <MdAssignmentTurnedIn />
                      <div className='text-xs pr-4'>ASSIGN</div>
                    </ADButton>
                  </Col>
                  <Col
                    xs={24}
                    lg={8}
                    className='flex items-center'
                    onClick={() => setIsShareModalOpen(true)}
                    style={{
                      cursor: 'pointer'
                    }}
                  >
                    <div className='text-2xl mr-2 flex'>
                      <ADImage src={shareIcon} alt='share' />
                    </div>
                    <div className='text-xs text-gray-500 leading-snug'>Share</div>
                  </Col>
                </Row>
              </Space>
            </Col>
          </Row>
        </div>
        <div className='px-8'>
          <div className='flex flex-row flex-wrap'>{worksheetList?.length && worksheetList.map((item) => <CardComponent setRerender={setRerender} key={item._id} item={item} cardWidth={215} />)}</div>
        </div>
      </>
      {/* )} */}
    </MainLayout>
  );
}

export default MyCollection;
