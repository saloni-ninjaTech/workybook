/* eslint-disable no-unsafe-optional-chaining */
import { CloseCircleFilled } from '@ant-design/icons';
import { Button, TreeSelect, Checkbox, Col, Divider, Modal, Row, Select, Tag, Typography, Space } from 'antd';
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import CardComponent from '../../components/common/CardComponent';
import MainLayout from '../../components/layout/MainLayout';
import { search } from '../../app/features/search/searchpageSlice';
import ADImage from '../../components/antd/ADImage';
import sortIcon from '../../assets/images/icons/sort.png';
import ThumbnailCard from '../../components/thumbnailCard/ThumbnailCard';
import { updateCollectionLike } from '../../app/features/collection/collectionSlice';
import ADTitle from '../../components/antd/ADTitle';
import Spinner from '../../components/spinner/Spinner';

function SearchResult() {
  const { user } = useSelector((state) => state.auth);
  const authToken = user?.payload?.verification?.token;
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [collectionLoader, setCollectionLoader] = useState(true);
  const [rerender, setRerender] = useState(0);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const { searchData } = useSelector((state) => state.search);
  const { isSearchResultLoading } = useSelector((state) => state.search);
  const { subjectData, ccsData } = useSelector((state) => state.home);
  const { grades } = useSelector((state) => state.grades);
  const [gradeArr, setgradeArr] = useState([]);
  const [subjectArr, setsubjectArr] = useState([]);
  const [ccsArr, setccsArr] = useState([]);
  const [sortBy, setSortBy] = useState('best_match');
  const [onScrollDataLength, setOnScrollDataLength] = useState(8);
  const subjects = subjectData?.list;
  const ccl = ccsData?.list;
  const worksheets = searchData?.content || [];
  const collections = searchData?.collection || [];
  const worksheetData = useMemo(() => {
    if (sortBy !== '') {
      setLoader(true);
      if (sortBy === 'title') {
        const filtered = worksheets?.slice()?.filter((a) => a?.[sortBy]);
        const noData = worksheets?.slice()?.filter((a) => !a?.[sortBy]);
        let sortedData = filtered.sort((a, b) => (a?.[sortBy]?.toLowerCase() > b?.[sortBy]?.toLowerCase() ? 1 : -1));
        sortedData = [...sortedData, ...noData];
        setLoader(false);
        return sortedData;
      }
      if (sortBy === 'best_match') {
        return worksheets;
      }
      const filtered = worksheets?.slice()?.filter((a) => a?.[sortBy]);
      const noData = worksheets?.slice()?.filter((a) => !a?.[sortBy]);
      let sortedData = filtered.sort((a, b) => (a?.[sortBy] > b?.[sortBy] ? 1 : -1));
      sortedData = [...sortedData, ...noData];
      setTimeout(() => {
        setLoader(false);
      }, 1000);
      return sortedData;
    }
    setLoader(false);
    return worksheets;
  }, [sortBy, searchData?.content]);

  const collectionData = useMemo(() => {
    setCollectionLoader(true);
    if (sortBy !== '') {
      setLoader(true);
      if (sortBy === 'title') {
        const filtered = collections?.slice()?.filter((a) => a?.[sortBy]);
        const noData = collections?.slice()?.filter((a) => !a?.[sortBy]);
        let sortedData = filtered.sort((a, b) => (a?.[sortBy]?.toLowerCase() > b?.[sortBy]?.toLowerCase() ? 1 : -1));
        sortedData = [...sortedData, ...noData];
        setLoader(false);
        setCollectionLoader(false);
        return sortedData;
      }
      const filtered = collections?.slice()?.filter((a) => a?.[sortBy]);
      const noData = collections?.slice()?.filter((a) => !a?.[sortBy]);
      let sortedData = filtered.sort((a, b) => (a?.[sortBy] > b?.[sortBy] ? 1 : -1));
      sortedData = [...sortedData, ...noData];
      setTimeout(() => {
        setLoader(false);
      }, 1000);
      setCollectionLoader(false);
      return sortedData;
    }
    setLoader(false);
    setCollectionLoader(false);
    return collections;
  }, [sortBy, searchData?.content]);

  const collectionFavHandler = async (e) => {
    const data = {
      collectionId: await e._id,
      favorite: !e.favorite
    };
    await dispatch(updateCollectionLike(data));
    await setRerender(Math.random());
  };

  const onChange = (checkedValues) => {
    setgradeArr(checkedValues);
    setRerender(Math.random());
  };

  const onChangeSubject = (checkedValues) => {
    setsubjectArr(checkedValues);
    setRerender(Math.random());
  };

  function closeTag() {
    dispatch(
      search({
        search: '',
        subject: subjectArr,
        grade: gradeArr,
        commonCoreStandards: ccsArr,
        stds_topic: []
      })
    );
  }

  const handleCcs = (value) => {
    setccsArr([value]);
    setRerender(Math.random());
  };

  useEffect(() => {
    if (subjectArr?.length || gradeArr?.length || ccsArr?.length) {
      dispatch(
        search({
          search: searchData?.searchText ? searchData?.searchText : '',
          subject: subjectArr,
          grade: gradeArr,
          commonCoreStandards: ccsArr,
          stds_topic: []
        })
      );
      setRerender(Math.random());
    }
  }, [subjectArr, gradeArr, ccsArr]);

  useEffect(() => {
    if (rerender !== 0) {
      dispatch(
        search({
          search: searchData?.searchText ? searchData?.searchText : '',
          subject: subjectArr,
          grade: gradeArr,
          commonCoreStandards: ccsArr,
          stds_topic: []
        })
      );
    }
  }, [rerender]);

  return (
    <MainLayout>
      <div className='w-full h-full flex flex-row'>
        <div className='min-w-[300px] hidden md:flex items-start'>
          <Row gutter={[16, 16]} className='flex flex-1 w-full !m-0 pt-[35px] flex-col'>
            <Col span={24} className='!pl-[50px] flex flex-col gap-[10px]'>
              <Typography.Text className='font-bold'>GRADES</Typography.Text>
              <div className='flex flex-col gap-[10px]'>
                <Checkbox.Group onChange={onChange}>
                  {grades?.list?.length &&
                    grades?.list?.map((item) => (
                      <Row className='pb-1.5' key={item?._id}>
                        <Checkbox key={`grade_${item?._id}`} value={item?._id} className='!ml-0'>
                          Grade
                          {' '}
                          <span className='capitalize'>{item?.title}</span>
                        </Checkbox>
                      </Row>
                    ))}
                </Checkbox.Group>
              </div>
              <Divider className='my-0' />
            </Col>
            <Col span={24} className='!pl-[50px] flex flex-col gap-[10px]'>
              <Typography.Text className='font-bold'>SUBJECTS</Typography.Text>
              <div className='flex flex-col gap-[10px]'>
                <Checkbox.Group onChange={onChangeSubject}>
                  {subjects?.length &&
                    subjects?.map((item) => (
                      <Row className='pb-1.5' key={item?._id}>
                        <Checkbox key={`grade_${item?._id}`} value={item?._id} className='!ml-0'>
                          <span className='capitalize'>{item?.title}</span>
                        </Checkbox>
                      </Row>
                    ))}
                </Checkbox.Group>
              </div>
              <Divider className='my-0' />
            </Col>
            <Col span={24} className='!pl-[50px] flex flex-col gap-[10px]'>
              <Typography.Text className='font-bold'>CCS</Typography.Text>
              <div className='flex flex-col gap-[10px]'>
                <Select className='max-w-[220px] !rounded-[8px]' onChange={handleCcs}>
                  {ccl?.length &&
                    ccl?.map((item) => (
                      <Select.Option key={item?._id} value={item?._id}>
                        {item?.title}
                      </Select.Option>
                    ))}
                </Select>
              </div>
            </Col>
          </Row>
        </div>
        <div className='flex flex-1 pt-[15px]'>
          <Row gutter={[16, 16]} className='flex flex-1 !m-0'>
            {searchData?.searchText && (
              <Col span={24} className='!pl-[20px] flex flex-wrap gap-[10px]'>
                <Tag closable className='h-[32px] bg-[#21212114] border-0 pt-[5px] rounded-[16px] px-[15px]' onClose={() => closeTag()} closeIcon={<CloseCircleFilled className='text-[12px] pl-[5px] pt-[5px]' />}>
                  <Typography.Text className='text-baseline'>{searchData?.searchText}</Typography.Text>
                </Tag>
              </Col>
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                paddingRight: 10
              }}
            >
              <Typography.Text className='font-bold'>{`${worksheets?.length + collections?.length ?? 0} resources found`}</Typography.Text>
              {worksheets?.length + collections?.length ? (
                <Space>
                  <ADImage src={sortIcon} alt='sort' />
                  <Select
                    placeholder='Sort By'
                    className='w-[150px] text-left'
                    onChange={(value) => setSortBy(value)}
                    style={{
                      borderRadius: 8
                    }}
                    defaultValue='best_match'
                  >
                    <Select.Option value='best_match'>Best Match</Select.Option>
                    <Select.Option value='title'>Title</Select.Option>
                    <Select.Option value='dt_upd'>Date Updated</Select.Option>
                    <Select.Option value='dt_added'>Newest</Select.Option>
                  </Select>
                </Space>
              ) : null}
            </div>

            {isSearchResultLoading || loader ? (
              <div
                style={{
                  marginTop: 50,
                  display: 'flex',
                  width: '70vw',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Spinner />
              </div>
            ) : (
              <div>
                <div>
                  {collections?.length === 0 || collectionLoader ? null : (
                    <div
                      style={{
                        marginBottom: 30
                      }}
                    >
                      <Typography.Text className='font-bold'>COLLECTIONS</Typography.Text>
                      <Row
                        gutter={[16, 16]}
                        style={{
                          marginTop: 10
                        }}
                      >
                        {collectionData?.length ?
                          collectionData?.map((item) => (
                            <Col xs={24} xl={6} lg={8} sm={12} key={item?._id}>
                              <ThumbnailCard onFavChange={() => collectionFavHandler(item)} favorite={item?.favorite} collection={item} thumbnails={item?.thumbnailList} key={item._id} id={item._id} />
                            </Col>
                          )) :
                          null}
                      </Row>
                    </div>
                  )}
                </div>

                <div>
                  {worksheetData?.length === 0 ? null : (
                    <>
                      <Typography.Text className='font-bold'>WORKSHEETS</Typography.Text>

                      <InfiniteScroll
                        loadMore={() => {
                          setOnScrollDataLength(onScrollDataLength + 6);
                        }}
                        hasMore={onScrollDataLength <= worksheetData?.length}
                        loader={(
                          <div className='loader' key={0}>
                            Loading ...
                          </div>
                        )}
                      >
                        <Col span={24} className='flex flex-wrap'>
                          {worksheetData?.length ? worksheetData?.slice(0, onScrollDataLength).map((item) => <CardComponent key={item?._id} setRerender={setRerender} likeStatus={item?.likes?.isLike} item={item} />) : <Typography.Text className='font-bold'>No Data Found </Typography.Text>}
                        </Col>
                      </InfiniteScroll>
                    </>
                  )}
                </div>
              </div>
            )}
          </Row>
        </div>
      </div>
      <Modal
        title='Filter'
        open={showMobileFilter}
        onCancel={() => setShowMobileFilter(false)}
        mask={false}
        className='mobileFilterModal'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          margin: 0,
          width: '100%',
          height: '100%',
          maxWidth: 'calc(100vw)',
          borderRadius: 0
        }}
        bodyStyle={{
          height: 'calc(100vh - 55px)',
          overflow: 'auto',
          borderRadius: 0
        }}
        footer={false}
      >
        <Row gutter={[16, 16]} className='flex flex-1 w-full !m-0 pt-[10px] flex-col'>
          <Col span={24} className='!pl-[10px] flex flex-col gap-[10px]'>
            <Typography.Text className='font-bold'>GRADES</Typography.Text>
            <div className='flex flex-col gap-[10px]'>
              {grades?.length &&
                grades?.map((item) => (
                  <Checkbox value={item} key={`grade_${item?._id}`} className='!ml-0'>
                    {`Grade ${(<span className='capitalize'>{item?.title}</span>)}`}
                  </Checkbox>
                ))}
            </div>
            <Divider className='my-0' />
          </Col>
          <Col span={24} className='!pl-[10px] flex flex-col gap-[10px]'>
            <Typography.Text className='font-bold'>GRADES</Typography.Text>
            <div className='flex flex-col gap-[10px]'>
              {grades?.length &&
                grades?.map((item) => (
                  <Checkbox value={item} key={`grade_${item?._id}`} className='!ml-0'>
                    {`Grade ${(<span className='capitalize'>{item}</span>)}`}
                  </Checkbox>
                ))}
            </div>
            <Divider className='my-0' />
          </Col>
          <Col span={24} className='!pl-[10px] flex flex-col gap-[10px]'>
            <Typography.Text className='font-bold'>CCS</Typography.Text>
            <div className='flex flex-col gap-[10px]'>
              <Select className='max-w-[220px] !rounded-[8px]'>
                <Select.Option value='test'>Test</Select.Option>
              </Select>
            </div>
          </Col>
        </Row>
      </Modal>
    </MainLayout>
  );
}

export default SearchResult;
