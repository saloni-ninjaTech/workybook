import React, { useState, useEffect } from 'react';
import { Col, Modal, Row, Select, Space, Steps, Tabs, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../components/layout/MainLayout';
import sortIcon from '../../assets/images/icons/sort.png';
import CardComponent from '../../components/common/CardComponent';
import ThumbnailCard from '../../components/thumbnailCard/ThumbnailCard';
import ADTitle from '../../components/antd/ADTitle';
import ADButton from '../../components/antd/ADButton';
import { getCollections, getFavoriteCollections, updateCollectionLike } from '../../app/features/collection/collectionSlice';
import ADImage from '../../components/antd/ADImage';
import { getRecentWorksheets } from '../../app/features/worksheet/worksheetSlice';
import AddToCollectionModal from '../../components/modals/AddToCollectionModal';
import AssignStep1 from '../../components/steps/assign/AssignStep1';
import AssignStep2 from '../../components/steps/assign/AssignStep2';
import AssignStep3 from '../../components/steps/assign/AssignStep3';
import Spinner from '../../components/spinner/Spinner';

function MyLibrary() {
  const favoriteCollections = useSelector((state) => state.collection.favoriteCollections?.list);
  const collections = useSelector((state) => state.collection.collections?.list);
  const recentWorksheets = useSelector((state) => state.worksheet?.recentWorksheets?.list);
  const user = localStorage.getItem('user');
  const [collectionData, setCollectionData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recentData, setRecentData] = useState([]);
  const [rerender, setRerender] = useState(0);
  const [sortBy, setSortBy] = useState('dt_added');
  const [currentTab, setCurrentTab] = useState('my collection');
  const [currentStep, setCurrentStep] = useState(0);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const { Step } = Steps;
  const collectionFavHandler = async (e) => {
    const data = {
      collectionId: await e._id,
      favorite: !e.favorite
    };
    await dispatch(updateCollectionLike(data));
    await setRerender(Math.random());
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setCollectionData(collections);
  }, [collections]);

  useEffect(() => {
    setRecentData(recentWorksheets);
  }, [recentWorksheets]);

  useEffect(() => {
    setFavorites(favoriteCollections);
  }, [favoriteCollections]);

  useEffect(() => {
    if (sortBy === 'title') {
      const filtered1 = favorites?.slice()?.filter((a) => a?.[sortBy]);
      const noData1 = favorites?.slice()?.filter((a) => !a?.[sortBy]);
      let sortedData1 = filtered1.sort((a, b) => (a?.[sortBy].toLowerCase() > b?.[sortBy].toLowerCase() ? 1 : -1));
      sortedData1 = [...sortedData1, ...noData1];
      setFavorites(sortedData1);

      const filtered2 = recentData?.slice()?.filter((a) => a?.[sortBy]);
      const noData2 = recentData?.slice()?.filter((a) => !a?.[sortBy]);
      let sortedData2 = filtered2.sort((a, b) => (a?.[sortBy].toLowerCase() > b?.[sortBy].toLowerCase() ? 1 : -1));
      sortedData2 = [...sortedData2, ...noData2];
      setRecentData(sortedData2);

      const filtered3 = collectionData?.slice()?.filter((a) => a?.[sortBy]);
      const noData3 = collectionData?.slice()?.filter((a) => !a?.[sortBy]);
      let sortedData3 = filtered3.sort((a, b) => (a?.[sortBy].toLowerCase() > b?.[sortBy].toLowerCase() ? 1 : -1));
      sortedData3 = [...sortedData3, ...noData3];
      setCollectionData(sortedData3);
    } else {
      const filtered1 = favorites?.slice()?.filter((a) => a?.[sortBy]);
      const noData1 = favorites?.slice()?.filter((a) => !a?.[sortBy]);
      let sortedData1 = filtered1.sort((a, b) => (a?.[sortBy] > b?.[sortBy] ? 1 : -1));
      sortedData1 = [...sortedData1, ...noData1];
      setFavorites(sortedData1);

      const filtered2 = recentData?.slice()?.filter((a) => a?.[sortBy]);
      const noData2 = recentData?.slice()?.filter((a) => !a?.[sortBy]);
      let sortedData2 = filtered2.sort((a, b) => (a?.[sortBy] > b?.[sortBy] ? 1 : -1));
      sortedData2 = [...sortedData2, ...noData2];
      setRecentData(sortedData2);

      const filtered3 = collectionData?.slice()?.filter((a) => (a?.[sortBy]));
      const noData3 = collectionData?.slice()?.filter((a) => (!a?.[sortBy]));
      let sortedData3 = filtered3.sort((a, b) => (a?.[sortBy] > b?.[sortBy] ? 1 : -1));
      sortedData3 = [...sortedData3, ...noData3];
      setCollectionData(sortedData3);
    }
  }, [sortBy]);

  useEffect(() => {
    const getData = async () => {
      if (user) {
        await dispatch(getCollections());
        await dispatch(updateCollectionLike());
        await dispatch(getRecentWorksheets());
        await dispatch(getFavoriteCollections());
      }
    };
    getData();
  }, [rerender]);

  const handleCollectionModalOk = () => {
    setIsCollectionModalOpen(false);
  };
  const handleCollectionModalCancel = () => {
    setIsCollectionModalOpen(false);
  };
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

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

  const collectionTab = (
    <Row gutter={[16, 16]}>
      {loader ? (
        <div style={{
          marginTop: '30vh', display: 'flex', justifyContent: 'center', width: '100%'
        }}
        >
          <Spinner />
        </div>
      ) : collectionData?.length ? (
        collectionData?.map((item) => (
          <Col xs={24} xl={6} lg={8} sm={12} key={item._id}>
            <ThumbnailCard onFavChange={() => collectionFavHandler(item)} favorite={item.favorite} collection={item} thumbnails={item.thumbnailList} key={item._id} id={item._id} />
          </Col>
        ))
      ) : (
        <ADTitle level={3} className='px-2 py-20 rounded-xl'>
          No Collections here!
        </ADTitle>
      )}

    </Row>
  );

  const favCollectionTab = (
    <>
      <Typography.Text className='font-bold'>COLLECTIONS</Typography.Text>
      <Row gutter={[16, 16]} className='py-4'>
        {collectionData?.filter((item) => item.favorite)?.length ? (
          collectionData
            ?.filter((item) => item.favorite)
            ?.map((item) => (
              <Col xs={24} xl={6} lg={8} sm={12} key={item._id}>
                <ThumbnailCard onFavChange={() => collectionFavHandler(item)} favorite={item.favorite} collection={item} thumbnails={item.thumbnailList} key={item._id} id={item._id} />
              </Col>
            ))
        ) : (
          <ADTitle level={3} className='px-2 py-20 rounded-xl'>
            No any favorites Collections
          </ADTitle>
        )}
      </Row>
      <Typography.Text className='font-bold'>WORKSHEETS</Typography.Text>
      <div className='flex flex-row flex-wrap'>
        {favorites?.length ? (
          favorites.map((item) => <CardComponent setRerender={setRerender} likeStatus={item?.likes?.isLike} key={item._id} item={item} cardWidth={215} />)
        ) : (
          <ADTitle level={3} className='px-2 py-20 rounded-xl'>
            No any favourites Worksheets
          </ADTitle>
        )}
      </div>
    </>
  );

  const recentTab = (
    <div className='flex flex-row flex-wrap'>
      {recentData?.length ? (
        recentData?.map((item) => <CardComponent setRerender={setRerender} likeStatus={item?.likes?.isLike} key={item._id} item={item} cardWidth={215} />)
      ) : (
        <ADTitle level={3} className='px-2 py-20 rounded-xl'>
          No any recent Worksheets
        </ADTitle>
      )}
    </div>
  );

  const tabItems = [
    {
      label: 'my collection',
      key: 'my collection',
      children: collectionTab
    },
    {
      label: 'favourites',
      key: 'favourites',
      children: favCollectionTab
    },
    {
      label: 'recent',
      key: 'recent',
      children: recentTab
    }
  ];
  const tabChangeHandler = (e) => {
    if (e === 'my collection') {
      setCurrentTab(e);
      dispatch(getCollections());
    } else if (e === 'favourites') {
      setCurrentTab(e);
      dispatch(getFavoriteCollections());
    } else if (e === 'recent') {
      setCurrentTab(e);
      dispatch(getRecentWorksheets());
    }
  };

  const addToCollectionModal = <AddToCollectionModal open={isCollectionModalOpen} onOk={handleCollectionModalOk} onCancel={handleCollectionModalCancel} />;

  return (
    <MainLayout>
      {addToCollectionModal}
      <Modal className='rounded-xl' centered footer={false} open={isStepModalOpen}>
        <ADTitle level={3} className='text-center text-danger pb-8'>
          Create New Assign Activities
        </ADTitle>
        <Steps current={currentStep}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className='steps-content'>{steps[currentStep].content}</div>
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
      <div className='px-8 py-8 flex justify-between align-center'>
        <ADTitle level={3}>{`My Library - ${currentTab}`}</ADTitle>
        <Space>
          <ADImage src={sortIcon} alt='sort' />
          <Select
            placeholder='Sort By'
            className='w-[150px] text-left'
            onChange={(value) => setSortBy(value)}
            style={{
              borderRadius: 8
            }}
          >
            <Select.Option value='title'>Title</Select.Option>
            <Select.Option value='dt_upd'>Date Updated</Select.Option>
            <Select.Option value='dt_added'>Newest</Select.Option>
          </Select>
        </Space>
      </div>
      <div className='px-8'>
        <Tabs onChange={tabChangeHandler} activeKey={currentTab} items={tabItems} />
      </div>
    </MainLayout>
  );
}

export default MyLibrary;
