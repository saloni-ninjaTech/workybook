/* eslint-disable jsx-a11y/click-events-have-key-events */
import { SearchOutlined } from '@ant-design/icons';
import { Col, Input, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ADButton from '../../components/antd/ADButton';
import GradeComponent from '../../components/common/GradeComponent';
import TopSubjectComponent from '../../components/common/TopSubjectComponent';
import MainLayout from '../../components/layout/MainLayout';
import { subjectTopic } from '../../app/features/search/searchpageSlice';
import { getSubGradeAndId } from '../../app/features/home/homepageSlice';

let subjectDetail; let subjectNewDetail;
export default function SubjectDetailsPage() {
  const mappedSubjectsData = [];
  const { sid } = useParams();
  const { Search } = Input;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ccsData: ccsData1, subjectData, gradeData, getSubGradeAndIdData } = useSelector((state) => state.home);
  mappedSubjectsData.push(subjectData.list?.find((item) => parseInt(item._id, 30) === parseInt(sid, 30)));
  const [ccsItems, setCCSItems] = useState(null);
  const { grades, currentGrade } = useSelector((state) => state.grades);
  const [curSubject, setCurSubject] = useState('');
  const [subjectDataArr, setSubjectDataArr] = useState();

  // useEffect(() => {
  //   setCurSubject(subjectData?.list?._id);
  // }, []);

  const handleGrade = (gselect) => {
    /// console.log(currentGrade, '--');
  };
  const topicSelectHandler = (topicName) => {
    if (topicName) {
      dispatch(
        subjectTopic({
          id: sid,
          topic: topicName
        })
      );
      navigate('/explore/search-result');
    }
  };

  const searchData = (dataArray, searchTerm) => dataArray?.flatMap((obj) => {
    const objHasSearchTerm = Object.entries(obj)
      .some(([key, value]) => key !== 'topics' && String(value).toLowerCase().includes(searchTerm.toLowerCase()));
    if (objHasSearchTerm && !obj) return [obj];
    const matchedTopics = searchData(obj?.topics ?? [], searchTerm);
    const searchedData = objHasSearchTerm || matchedTopics?.length ?
      [{
        ...obj,
        topics: matchedTopics
      }] :
      [];
    return searchedData;
  });

  function renderCCSItem(items, ccsData, level) {
    let item = '<></>';

    if (ccsData?.topics && ccsData?.topics?.length) {
      if (level === 0) {
        items.push(<div className='w-full h-1' />);
      }
      if (level === 1) {
        // items.push(<div className='w-full p-0.5 bg-gray-600' />);
      }
      let style = 'self-center p-2';
      if (level === 1) style += ' text-3xl font-bold py-2';
      else if (level === 2) style += ' text-2xl font-bold py-3';

      level += 1;
      //  style+=" m-"+level*2;

      const parentItem = (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className={style} onClick={() => topicSelectHandler(ccsData?.title)}>
          <span className='cursor-pointer hover:text-blue-500'>{ccsData.title}</span>
        </div>
      );

      // eslint-disable-next-line no-empty
      if ((curSubject === 3 && level === 2) || (curSubject === 4 && level === 3)) {
      } else {
        const subItems = [];
        for (let i = 0; i < ccsData?.topics?.length; i += 1) {
          renderCCSItem(subItems, ccsData.topics[i], level);
        }
        if (level === 1) {
          items.push(
            <div className='bg-white w-full'>
              {/* {parentItem} */}
              <div className='bg-white w-full'>{subItems}</div>
            </div>
          );
        }
        if (level === 2) {
          items.push(
            <div className='bg-white'>
              <div>{parentItem}</div>
              {/* <div className='w-full p-0.5 bg-gray-600' /> */}
              <div className='bg-gray-100 w-full'>{subItems}</div>
            </div>
          );
        }
        if (level === 3) {
          items.push(
            <div className='bg-white'>
              {parentItem}
              <div className='bg-gray-100 w-full flex flex-wrap'>{subItems}</div>
            </div>
          );
        }
      }
    } else {
      if (level === 2) {
        item = (
          <ADButton type='text' onClick={() => topicSelectHandler(ccsData?.title)} className='flex w-1/2 justify-between md-w-64 p-3  text-left text-sm font-medium text-gray-900'>
            <span>{ccsData?.title}</span>
          </ADButton>
        );
      } else {
        item = (
          ccsData?.title ? (
            <ADButton type='text' onClick={() => topicSelectHandler(ccsData?.title)} className='flex w-1/2 justify-between md-w-64 p-3  text-left text-sm font-medium text-gray-900'>
              <span>{ccsData?.title}</span>
            </ADButton>
          ) : <span className='self-center p-2 text-2xl font-bold'> No data found!</span>
          //
        );
      }

      items.push(item);
    }
  }

  const onSearch = (value) => {
    const ab = [];
    const ccsItemsArr = [];
    const subjTree = subjectData?.list;
    subjectNewDetail = subjTree?.find((item) => parseInt(item._id, 30) === parseInt(sid, 30));
    ab.push(subjectNewDetail);
    const newData = searchData(ab, value);
    renderCCSItem(ccsItemsArr, newData?.[0], 0);
    setCCSItems(ccsItemsArr);
  };
  useEffect(() => {
    dispatch(getSubGradeAndId({
      id: sid, grade: currentGrade?._id
    })).then((res) => {
      // setSubjectDataArr(res?.payload?.subject);
      const ccsItemsAr = [];
      // const subjTree = getSubGradeAndIdData?.subject;
      // subjectDetail = subjTree?.find((item) => parseInt(item._id, 30) === parseInt(sid, 30));
      // eslint-disable-next-line no-use-before-define
      renderCCSItem(ccsItemsAr, res?.payload?.subject[0], 0);
      setCCSItems(ccsItemsAr);
      setCurSubject(subjectData?.list?.find((item) => parseInt(item._id, 30) === parseInt(sid, 30))._id);
      setSubjectDataArr(subjectData?.list?.find((item) => parseInt(item._id, 30) === parseInt(sid, 30)));
    });
  }, [sid, currentGrade]);
  return (
    <MainLayout>
      <TopSubjectComponent subjectList={subjectData?.list} ccsList={ccsData1?.list} />
      <GradeComponent activeGrade='3' gradeList={gradeData?.list} getGrade={handleGrade} />
      <Row style={{
        padding: '1rem 3.5rem'
      }}
      >
        <Col lg={12} xs={24}>
          <Typography.Title level={3} className='md:text-left text-center'>
            {subjectDataArr?.title}
            { ` - ${currentGrade?.title}`}
          </Typography.Title>
        </Col>
        <Col lg={12} xs={24} className='text-center md:text-right'>
          <Search
            placeholder={`Search ${subjectDataArr?.title} Topics`}
            className='w-full max-w-[487px] h-[40px] rounded-[60px]'
            onSearch={onSearch}
          />
        </Col>
      </Row>
      <div className='w-full m-auto flex flex-wrap px-12'>{ccsItems}</div>
    </MainLayout>
  );
}
