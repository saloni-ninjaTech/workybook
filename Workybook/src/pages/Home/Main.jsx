import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
import { getClassrooms, setClass } from '../../app/features/classroom/classroomSlice';

import LogoHeader from '../../components/common/LogoHeader';
import ADButton from '../../components/antd/ADButton';
import CreateClassModal from '../../components/modals/CreateClassModal';
import { getProfile } from '../../app/features/user/userSlice';
import Spinner from '../../components/spinner/Spinner';

function Home() {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;

  const { userData } = useSelector((state) => state.user);
  const popularWorksheets = useSelector((state) => state.worksheet.popularWorksheets?.list);
  const { grades, currentGrade } = useSelector((state) => state.grades);
  const { subjectData, ccsData } = useSelector((state) => state.home);
  const worksheetsByGrades = useSelector((state) => state.worksheet.worksheetsByGrades);
  const { classes, isLoading, currentClass, currentCreateClass } = useSelector((state) => state.classroom);
  const [rerender, setRerender] = useState(0);
  const [loader, setLoader] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCreateClassModalOpen, setIsCreateClassModalOpen] = useState(false);

  useEffect(() => {
    //   console.log('user', JSON.parse(user)?.payload?._id);
    const loadData = async () => {
      await dispatch(getProfile({
        id: JSON.parse(user)?.payload?._id
      }));
      await dispatch(getClassrooms());

      await dispatch(fetchGrades());
      await setLoader(false);
    };
    loadData();
    // await dispatch(getProfile({
    //   id: JSON.parse(user)?.payload?._id
    // })).then(() => {
    // ///   setLoader(false);
    // });
    // await dispatch(getClassrooms());
    // await dispatch(fetchGrades());
    // await setLoader(false);
  }, [user]);
  useEffect(() => {
    // console.log(classes, 'classes');
    if (classes?.list?.length === 1) {
      dispatch(setClass(classes?.list[0]));
      navigate('/explore');
    }
  }, [classes]);

  const classDataRedirect = async (data) => {
    await dispatch(setClass(data));
    await dispatch(listSubject({
      gradeId: data.gradeId
    }));
    await dispatch(listCCL({
      gradeId: data.gradeId
    }));
    await dispatch(setCurrentGrade(data?.grade));
    await navigate('/explore');
  };
  const gradeDataRedirect = (data) => {
    dispatch(listSubject({
      gradeId: data.gradeId
    }));
    dispatch(listCCL({
      gradeId: data.gradeId
    }));
    dispatch(setCurrentGrade(data));
    navigate('/explore');
  };
  const showCreateClassModal = () => {
    setIsCreateClassModalOpen(true);
  };

  const handleCreateClassOk = async () => {
    setIsCreateClassModalOpen(false);
  };

  const handleCreateClassCancel = () => {
    setIsCreateClassModalOpen(false);
  };
  const createClassRoom = <CreateClassModal closable={false} open={isCreateClassModalOpen} onShow={showCreateClassModal} onOk={handleCreateClassOk} onCancel={handleCreateClassCancel} />;

  return (
    <>
      {createClassRoom}
      <LogoHeader />
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
        <>
          {' '}
          <Typography.Title level={3} className='m-auto !mt-[50px] !mb-[35px] text-center'>
            Welcome
            {' '}
            {`${userData?.user?.firstName ? userData?.user?.firstName : ''} ${userData?.user?.lastName ? userData?.user?.lastName : ''}`}
          </Typography.Title>
          {' '}
          {classes && classes?.list?.length > 1 && (
          <>
            <div className='w-[90%] max-w-[1121px] min-h-[176px] text-center m-auto rounded-[12px]'>
              <p className='pt-[17px] text-lg pb-[0px]'>Select the classroom you want to work with</p>
            </div>
            <div className='w-full max-w-[620px] min-h-[203px] m-auto !pb-[50px]'>
              <Row
                gutter={[16, 16]}
                className='text-center !m-[0px]'
                style={{
                  rowGgap: '16px',
                  display: 'grid',
                  gridTemplateColumns: 'auto auto auto'
                }}
              >
                {
                classes?.list?.slice(0, 10).map((item) => (
                  <Col span={24}>
                    <ADButton
                      onClick={() => classDataRedirect(item)}
                      className='bg-gray-300 w-[223px] h-full'
                      style={{
                        display: 'initial'
                      }}
                    >
                      <p className='text-[10px]'>
                        GRADE
                        {' '}
                        {item?.classGrade}
                      </p>
                      <Typography.Title className='whitespace-normal' level={4}>
                        {`Class ${item?.name}`}
                      </Typography.Title>
                    </ADButton>
                  </Col>
                ))
              }
              </Row>
            </div>
          </>
          ) }
          { classes && classes?.list?.length < 1 && (
            <>
              {' '}
              <div className='bg-gray-100 w-[90%] max-w-[1121px] min-h-[176px] text-center m-auto rounded-[12px]'>
                <p className='pt-[17px] text-lg pb-[0px]'>Start using Workybooks in your classroom with your students!</p>
                <p className='text-sm pb-[31px]'>With classrooms you can add students and digitally assign worksheets, grade and generate student progress reports.</p>
                <ADButton
                  type='primary'
                  className='m-auto mb-[17px]'
                  onClick={() => {
                    showCreateClassModal();
                  }}
                >
                  CREATE MY FIRST CLASSROOM
                </ADButton>
              </div>
              <p className='mt-[107px] mb-[39px] text-center text-baseline w-[85%] m-auto'>Don’t wish to create a Classroom yet? Select the grade you want to work with</p>

              <div className='w-full max-w-[620px] min-h-[203px] m-auto !pb-[50px]'>
                <Row gutter={[16, 16]} className='text-center !m-[0px]'>
                  {grades?.list?.slice(0, 8).map((item) => (
                    <Col lg={6} xs={12}>
                      <ADButton
                        onClick={() => gradeDataRedirect(item)}
                        type='success'
                        className='w-full h-full'
                        style={{
                          display: 'initial'
                        }}
                      >
                        <p className='text-[10px]'>GRADE</p>
                        <Typography.Title level={1}>{item?.title}</Typography.Title>
                      </ADButton>
                    </Col>
                  ))}
                </Row>
              </div>
            </>
          )}
        </>
      )}

    </>
  );
}
export default Home;
