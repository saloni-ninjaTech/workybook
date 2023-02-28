import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { listSubject, listCCL } from '../../app/features/home/homepageSlice';
import { getPopularWorksheets, getWorksheets, getWorksheetsByGrades } from '../../app/features/worksheet/worksheetSlice';
import CardComponent from '../../components/common/CardComponent';
import MainLayout from '../../components/layout/MainLayout';
import dummyImage1 from '../../assets/images/dummyImage1.png';
import GradeComponent from '../../components/common/GradeComponent';
import TopSubjectComponent from '../../components/common/TopSubjectComponent';
import ADImage from '../../components/antd/ADImage';
import { fetchGrades, setCurrentGrade } from '../../app/features/grade/GradeSlice';
import { getAssignments } from '../../app/features/assignment/assignmentSlice';

function Home() {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;

  const worksheets = useSelector((state) => state.worksheet.worksheets);
  const popularWorksheets = useSelector((state) => state.worksheet.popularWorksheets?.list);
  const { grades, currentGrade } = useSelector((state) => state.grades);
  const { subjectData, ccsData } = useSelector((state) => state.home);
  const worksheetsByGrades = useSelector((state) => state.worksheet.worksheetsByGrades);

  const [rerender, setRerender] = useState(0);
  const [call, setCall] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAssignments());
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setCall(false);
      await dispatch(fetchGrades());
      if (currentGrade !== '') {
        await dispatch(setCurrentGrade(currentGrade));
      }
      setCall(true);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (authToken) {
      const fetchData = async () => {
        if (call) {
          await dispatch(
            getWorksheetsByGrades({
              gradeId: currentGrade?._id
            })
          );
          await dispatch(
            getPopularWorksheets({
              gradeId: [currentGrade?._id]
            })
          );
        }
        await dispatch(
          getWorksheetsByGrades({
            gradeId: currentGrade?._id
          })
        );
        await dispatch(
          getPopularWorksheets({
            gradeId: [currentGrade?._id]
          })
        );
        await dispatch(listSubject({
          gradeId: currentGrade.gradeId
        }));
        await dispatch(listCCL({
          gradeId: currentGrade.gradeId
        }));
        await dispatch(getWorksheets({
          limit: 300
        }));
      };
      fetchData();
    }
  }, [user, rerender, call]);

  return (
    <MainLayout>
      {user && (
        <div className='w-full max-w-[95%] m-auto'>
          <TopSubjectComponent subjectList={subjectData?.list} ccsList={ccsData?.list} />
          <GradeComponent />
          <Row gutter={16} className='mt-[15px] border rounded-md'>
            <Col span={16} className='max-h-[253px] pr-0'>
              <ADImage src={dummyImage1} alt='test' height='100%' />
            </Col>
            <Col span={8} className='max-h-[253px] pl-0'>
              <ADImage src={dummyImage1} alt='test' height='100%' />
            </Col>
          </Row>
          <h3 className='uppercase pl-[15px] mt-[15px]'>New in workybooks</h3>
          <div
            className='flex flex-row'
            style={{
              overflow: 'scroll'
            }}
          >
            {worksheetsByGrades?.list?.length ? worksheetsByGrades?.list?.map((item) => <CardComponent setRerender={setRerender} key={item._id} item={item} />) : <h2 className='px-4 py-24 text-center w-full'>no any worksheet here!</h2>}
          </div>
          <h3 className='uppercase pl-[15px] mt-[15px]'>Popular</h3>
          <div className='flex flex-row scrollVertical width-full'>{popularWorksheets?.length ? popularWorksheets?.map((item) => <CardComponent setRerender={setRerender} key={item._id} item={item} />) : <h2 className='px-4 py-24 text-center w-full'>no any popular worksheet here!</h2>}</div>
        </div>
      )}
    </MainLayout>
  );
}
export default Home;
