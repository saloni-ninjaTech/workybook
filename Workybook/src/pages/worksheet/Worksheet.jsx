/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
import { FaPrint, FaFolderPlus, FaLink } from 'react-icons/fa';
import { MdAssignmentTurnedIn } from 'react-icons/md';
import { Col, Image, Row, Space, Tag, Tooltip } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { EmailShareButton, PinterestShareButton, PinterestIcon, EmailIcon, FacebookShareButton, FacebookIcon } from 'react-share';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { worksheetDetails } from '../../app/features/home/homepageSlice';
import ADButton from '../../components/antd/ADButton';
import AssignModal from '../../components/modals/AssignModal';
import StepModal from '../../components/modals/StepModal';
import ADTitle from '../../components/antd/ADTitle';
import MainLayout from '../../components/layout/MainLayout';
import { createCollection } from '../../app/features/collection/collectionSlice';
import PrintImages from '../../components/common/PrintImages';
import AddToCollectionModal from '../../components/modals/AddToCollectionModal';
import { search } from '../../app/features/search/searchpageSlice';
import { setCurrentWorksheet } from '../../app/features/worksheet/worksheetSlice';
import Spinner from '../../components/spinner/Spinner';

let wDetail;
function Worksheet() {
  const worksheets = useSelector((state) => state.worksheet.worksheets);
  const { user } = useSelector((state) => state.auth);
  const authToken = user?.payload?.verification?.token;
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [worksheetDetail, setWorksheetDetails] = useState();
  const [copied, setCopied] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { worksheetDetailsInfo } = useSelector((state) => state.home);
  const componentRef = useRef();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (user && userId) {
      dispatch(
        worksheetDetails({
          id: userId
        })
      ).then(() => { setLoader(false); });
    }
  }, [userId]);

  useEffect(() => {
    if (worksheetDetailsInfo !== undefined) {
      setWorksheetDetails(worksheetDetailsInfo);
    }
  }, [worksheetDetailsInfo]);

  const copyHandler = () => {
    const el = document.createElement('input');
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  // collection modal's functions
  const showCollectionModal = () => {
    setIsCollectionModalOpen(true);
  };

  const handleCollectionModalOk = () => {
    setIsCollectionModalOpen(false);
  };

  const onCollectionCreateClick = (val) => {
    if (val) {
      const data = {
        title: val,
        favorite: false,
        content: [userId],
        added_by: user?.payload?._id
      };
      dispatch(createCollection(data));
      // dispatch(updateCollection());
      setIsCollectionModalOpen(false);
      // setRerender(Math.random());
    }
  };

  const handleCollectionModalCancel = () => {
    setIsCollectionModalOpen(false);
  };

  // assign modal's functions
  const showAssignModal = () => {
    setIsAssignModalOpen(true);
  };

  const handleAssignModalOk = () => {
    setIsAssignModalOpen(false);
  };

  const handleAssignModalCancel = () => {
    setIsAssignModalOpen(false);
  };

  const onAssignCreateClick = () => {
    setCurrentStep(0);
    setIsAssignModalOpen(false);
    setIsStepModalOpen(true);
  };

  // step modal's functions
  const handleStepModalOk = () => {
    setIsStepModalOpen(false);
    dispatch(setCurrentStep(0));
  };

  const handleStepModalCancel = () => {
    setIsStepModalOpen(false);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const onSearchTag = (value) => {
    if (value !== '' && value !== undefined) {
      dispatch(
        search({
          search: value,
          subject: [],
          grade: [],
          commonCoreStandards: [],
          stds_topic: []
        })
      );
      navigate('/explore/search-result');
    }
  };

  const assignModal = <AssignModal open={isAssignModalOpen} onOk={handleAssignModalOk} onCancel={handleAssignModalCancel} onCreate={onAssignCreateClick} />;
  const addToCollectionModal = <AddToCollectionModal closable={false} open={isCollectionModalOpen} onOk={handleCollectionModalOk} onCancel={handleCollectionModalCancel} />;
  const stepModal = <StepModal open={isStepModalOpen} onOk={handleStepModalOk} onCancel={handleStepModalCancel} nextStep={nextStep} prevStep={prevStep} />;

  return (
    <MainLayout>
      {addToCollectionModal}
      {assignModal}
      {stepModal}
      {loader ? (
        <div
          style={{
            marginTop: 50,
            display: 'flex',
            // width: '70vw',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Spinner />
        </div>
      ) : (
        <div className='container pt-16 my-0 mx-auto ml- md:px-4'>
          <Row gutter={[16, 16]} className='pb-8'>
            <Col xs={24} md={12} lg={8} xl={6}>
              <div className='xl:pr-10 lg:pr-6 md:pr-4 pr-0'>
                <Space direction='vertical' className='w-full'>
                  {worksheetDetail?.thumbnail ? (
                    <Image
                      width='100%'
                      src={worksheetDetail?.thumbnail}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = 'https://via.placeholder.com/215x278';
                      }}
                    />
                  ) : (
                    <div className='bg-gray-300 aspect-[2.5/3] w-full rounded w-full' />
                  )}
                  <ADButton type='primary' block className='justify-center mt-3' onClick={() => window.open('https://www.google.com')}>
                    PLAY WORKSHEET
                  </ADButton>
                  <PrintImages ref={componentRef} src={[worksheetDetail?.thumbnail]} />
                </Space>
                <Row gutter={16} className='text-gray-400 pt-6 pb-5'>
                  <Col
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
                  <Col lg={8} className='flex items-center border-y-0 border-l-0 border-solid'>
                    <ADButton onClick={showAssignModal} type='text' className='text-left text-gray-400 !p-0 !m-0'>
                      <div className='flex items-center'>
                        <div className='text-2xl mr-2 flex'>
                          <MdAssignmentTurnedIn />
                        </div>
                        <div className='text-xs text-gray-500 leading-snug'>ASSIGN</div>
                      </div>
                    </ADButton>
                  </Col>
                  <Col lg={8}>
                    <ADButton onClick={showCollectionModal} type='text' className='text-left text-gray-400 !p-0 !m-0'>
                      <div className='flex items-center'>
                        <div className='text-2xl mr-2 flex'>
                          <FaFolderPlus />
                        </div>
                        <div className='text-xs text-gray-500 leading-snug'>
                          ADD TO <br /> COLLECTION
                        </div>
                      </div>
                    </ADButton>
                  </Col>
                </Row>
                <div className='border border-solid border-slate-300 rounded-2xl py-4 px-3 text-slate-400'>
                  <div className='flex items-center justify-between'>
                    <div className='flex mx-0'>SHARE</div>
                    <div className='text-2xl flex mx-2'>
                      <EmailShareButton url={String(window.location)} subject='Subjec is here' body='body' className='flex justify-center'>
                        <EmailIcon size={28} round />
                      </EmailShareButton>
                    </div>
                    <div className='text-2xl flex mx-2'>
                      <PinterestShareButton media={worksheetDetail?.thumbnail} title='Pinterest' url={String(window.location)} className='flex justify-center'>
                        <PinterestIcon size={28} round />
                      </PinterestShareButton>
                    </div>
                    <div className='text-2xl flex mx-2'>
                      <FacebookShareButton url={String(window.location)} className='flex justify-center'>
                        <FacebookIcon size={28} round />
                      </FacebookShareButton>
                    </div>
                    <div className='text-2xl flex mx-2'>
                      <ADButton onClick={copyHandler} type='text' className='!p-0 text-gray-400 flex items-center w-full'>
                        {!copied ? <FaLink className='text-xl px-px' /> : <BsFillCheckCircleFill className='text-primary text-2xl font-bold' />}
                      </ADButton>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12} lg={16} xl={18}>
              <ADTitle level={2}>{worksheetDetail?.title}</ADTitle>
              <div className='grid grid-cols-2 py-4 w-fit mb-4'>
                <div>Publisher:</div>
                <div>{worksheetDetail?.pub}</div>
                <div>Written by:</div>
                <div>{worksheetDetail?.author}</div>
                <div>Illustrated by:</div>
                <div>{worksheetDetail?.illust}</div>
              </div>
              <div className='flex pb-4'>
                <div className='font-bold min-w-[100px]'>Grades</div>
                <Space size='large' className='pb-3'>
                  {worksheetDetail?.grades?.map((item) => (
                    <div key={item._id} className='w-[80px] text-center bg-gray-200'>
                      {item.title}
                    </div>
                  ))}
                </Space>
              </div>
              <div className='flex pb-4'>
                <div className='font-bold min-w-[100px]'>Standards</div>
                <Space size='large' className='pb-3'>
                  {worksheetDetail?.stds_topic?.slice(0, 3).map((item, index) => (
                    <div key={item._id} className='w-[80px] text-center bg-gray-200'>
                      {item}
                    </div>
                  ))}{
                  worksheetDetail?.stds_topic?.length > 4 && (

                    <Tooltip title={worksheetDetail?.stds_topic?.slice(4, worksheetDetail?.stds_topic?.length).join('\r\n')}>
                      <div
                        className='w-[80px] text-center bg-gray-200 cursor-pointer'
                      ><span> ...</span>
                      </div>
                    </Tooltip>

                  )
                }

                </Space>
              </div>
              <ADTitle level={4}>About this Activities</ADTitle>
              <p>{worksheetDetail?.descrpt}</p>
              <Space direction='vertical' size='small'>
                <div>orientation (setting, characters, and mood)</div>
                <div>complication</div>
                <div>events and climax</div>
                <div>resolution</div>
              </Space>
              <div>
                <ADTitle level={4} className='py-4'>
                  Tags
                </ADTitle>
                <Space className='flex-wrap'>
                  {worksheetDetail?.keyw?.map((item) => (
                    <div
                      key={item}
                      style={{
                        cursor: 'pointer'
                      }}
                      onClick={() => onSearchTag(item)}
                    >
                      <Tag className='rounded-full'>
                        {item}
                      </Tag>
                    </div>
                  ))}
                </Space>
              </div>
            </Col>
          </Row>
          <ADTitle level={4}>Similar worksheets</ADTitle>
          <Space size='large' className='overflow-x-auto w-full py-6'>
            {worksheets?.list?.filter((b) => {
              if (b.stds_topic && b._id !== worksheetDetail?._id) {
                const c = b.stds_topic.some((e) => worksheetDetail?.stds_topic?.includes(e));
                return c;
              } return false;
            }).slice(0, 15).map((i) => (
              <div key={i._id} onClick={() => dispatch(setCurrentWorksheet(i))}>
                <Link to={i._id ? `/my-library/worksheet/${i._id}` : ''}>
                  <Image
                    key={i}
                    src={i.thumbnail}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = 'https://via.placeholder.com/215x278';
                    }}
                    preview={false}
                    className='rounded-2xl w-full w-[200px]'
                  />
                </Link>
              </div>
            ))}
          </Space>
        </div>
      )}
    </MainLayout>
  );
}

export default Worksheet;
