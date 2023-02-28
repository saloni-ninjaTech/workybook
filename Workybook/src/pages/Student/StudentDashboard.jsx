/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import { Badge, Col, List, Progress, Row, Select, Space } from 'antd';
import { FaChartLine, FaCheck, FaPencilAlt, FaTimes } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import ADButton from '../../components/antd/ADButton';
import dummyImage from '../../assets/images/dummyImage.png';
import ADTitle from '../../components/antd/ADTitle';
import MainLayout from '../../components/layout/MainLayout';
import ADImage from '../../components/antd/ADImage';
import ADSelect from '../../components/antd/ADSelect';
import Spinner from '../../components/spinner/Spinner';
import { setStudent } from '../../app/features/students/studentsSlice';
import { getSubmittedAssignments } from '../../app/features/assignment/assignmentSlice';
import EditStudentModal from '../../components/modals/EditStudentModal';

function StudentDashboard() {
  const { currentClass } = useSelector((state) => state.classroom);
  const { currentStudent, students } = useSelector((state) => state.students);
  const { submittedAssignments, isLoading } = useSelector((state) => state.assignment);
  const [showEditStudent, setShowEditStudent] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const cs = students?.list.find((item) => item._id === id);
      dispatch(setStudent(cs));
      dispatch(
        getSubmittedAssignments({
          studentId: id,
          classId: currentClass?._id
        })
      );
    }
  }, []);

  const onStudentChangeHandler = async (e) => {
    const cs = await students?.list.find((item) => item._id === e);
    await dispatch(setStudent(await cs));
    navigate(`/my-classrooms/student-dashboard/${e}`);
    await dispatch(
      getSubmittedAssignments(
        await {
          studentId: e,
          classId: currentClass?._id
        }
      )
    );
  };

  const showEditStudentModal = async (data) => {
    await dispatch(setStudent(data));
    setShowEditStudent(true);
  };

  const handleEditStudentOk = () => {
    setShowEditStudent(false);
  };

  const handleEditStudentCancel = () => {
    setShowEditStudent(false);
  };

  const editStudentModal = <EditStudentModal closable={false} open={showEditStudent} onOk={handleEditStudentOk} onCancel={handleEditStudentCancel} />;

  const studentsOptions = students?.list?.length ?
    students?.list?.map(({ _id: value, fullName: label, ...rest }) => ({
      value,
      label,
      ...rest
    })) :
    [
      {
        value: '',
        label: 'No Student'
      }
    ];

  const header = (
    <Row>
      <Col xl={7} lg={7} md={7} sm={8} xs={10}>
        <div className='text-center inter-font font-medium text-xs'>NAME</div>
      </Col>
      <Col xl={8} lg={8} md={8} sm={10} xs={8}>
        <div className='text-center inter-font font-medium text-xs'>SCORE</div>
      </Col>
      <Col xl={3} lg={3} md={3} sm={3} xs={3}>
        <div className='text-center inter-font font-medium text-xs'>GRADE</div>
      </Col>
      <Col xl={3} lg={3} md={3} sm={3} xs={3}>
        <div className='text-center inter-font font-medium text-xs'>DATE SUBMITTED</div>
      </Col>
      <Col xl={3} lg={3} md={3} sm={3} xs={3}>
        <div className='text-center inter-font font-medium text-xs'>VIEW WORK</div>
      </Col>
    </Row>
  );

  return (
    <MainLayout>
      {editStudentModal}
      <div className='px-4 py-8 w-full flex justify-between'>
        <Space size='large'>
          <div className='flex flex-col'>
            <div className='relative'>
              <ADTitle level={5} className='!text-sm absolute h-0 top-[-16px] left-0'>
                {currentClass?.name}
              </ADTitle>
              <ADTitle level={2}>Student</ADTitle>
            </div>
          </div>
          <ADSelect className='w-40' value={currentStudent?.fullName} onChange={(e) => onStudentChangeHandler(e)} options={studentsOptions} />
          <div className='flex'>
            <ADButton type='text' className='!p-0' onClick={() => showEditStudentModal(currentStudent)}>
              <FaPencilAlt className='text-gray-400 text-lg' />
            </ADButton>
          </div>
        </Space>
        <ADButton type='primary' className='h-fit'>
          Student Reports
        </ADButton>
      </div>
      <div className='mx-4 border border-solid border-t-0' />
      <div className='xl:px-20 lg:px-16 md:px-10 px-0 py-6'>
        { isLoading ? (
          <Spinner full />
        ) : (
          <List
            className='rounded-t-lg with-header'
            header={header}
            itemLayout='horizontal'
            pagination={{
              onChange: (page) => {},
              pageSize: 10
            }}
            dataSource={submittedAssignments?.list}
            bordered
            renderItem={(item) => (
              <List.Item>
                <Row gutter={[0, 16]} className='w-full'>
                  <Col xl={7} lg={7} md={7} sm={8} xs={10} className='flex items-center'>
                    <Row gutter={16} className='w-full'>
                      <Col xs={24} md={24} lg={12} xl={10} xxl={8}>
                        <ADImage alt='cover-img' src={dummyImage} className='w-full aspect-[80px/100px] object-cover rounded max-w-[100px]' />
                      </Col>
                      <Col xs={24} md={24} lg={12} xl={14} xxl={16} className='inter-font text-sm'>
                        <div className='flex flex-col justify-center h-full lg:py-0 py-4'>
                          <div className='font-medium'>{item?.title}</div>
                          <div className='font-normal text-gray-400 truncate'>
                            {item?.SubmittedAssignments?.contentScore?.content?.[0]?.stds_topic.map((topic, index) => (
                              <span key={index}>{`${topic}${index < item?.contentScore?.content?.[0]?.stds_topic.length - 1 ? ', ' : ''}`}</span>
                            ))}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col xl={8} lg={8} md={8} sm={10} xs={8} className='flex justify-center items-center'>
                    <Row className='rounded-2xl md:px-4 px-2 py-4 border border-solid border-slate-300 w-full'>
                      <Col
                        xs={12}
                        sm={12}
                        md={{
                          span: 8,
                          order: 1
                        }}
                        xl={{
                          span: 4,
                          order: 1
                        }}
                        className='flex flex-col justify-center items-center'
                      >
                        <div>TIME</div>
                        <div>{item?.time ? item?.time : '-'}</div>
                      </Col>
                      <Col
                        xs={12}
                        sm={12}
                        md={{
                          span: 8,
                          order: 4
                        }}
                        xl={{
                          span: 4,
                          order: 2
                        }}
                        className='flex flex-col justify-center items-center'
                      >
                        <div className='flex pb-1'>
                          <FaCheck className='text-slate-400' />
                        </div>
                        <div className='font-bold'>{item?.currectAnswer || '-'}</div>
                      </Col>
                      <Col
                        xs={12}
                        sm={12}
                        md={{
                          span: 8,
                          order: 5
                        }}
                        xl={{
                          span: 4,
                          order: 3
                        }}
                        className='flex flex-col justify-center items-center'
                      >
                        <div className='flex pb-1'>
                          <FaTimes className='text-slate-400' />
                        </div>
                        <div className='font-bold'>{item?.wrongAnswer || '-'}</div>
                      </Col>
                      <Col
                        xs={12}
                        sm={12}
                        md={{
                          span: 8,
                          order: 6
                        }}
                        xl={{
                          span: 4,
                          order: 4
                        }}
                        className='flex flex-col justify-center items-center'
                      >
                        <div className='flex pb-1'>
                          <BsThreeDots className='text-slate-400' />
                        </div>
                        <div className='font-bold'>{item?.blankAnswer || '-'}</div>
                      </Col>
                      <Col
                        xs={12}
                        sm={12}
                        md={{
                          span: 8,
                          order: 2
                        }}
                        xl={{
                          span: 4,
                          order: 5
                        }}
                        className='flex flex-col justify-center items-center'
                      >
                        <div className=''>SCORE</div>
                        <div className='font-bold'>
                          {item?.score}
                          %
                        </div>
                      </Col>
                      <Col
                        xs={12}
                        sm={12}
                        md={{
                          span: 8,
                          order: 3
                        }}
                        xl={{
                          span: 4,
                          order: 6
                        }}
                        className='flex flex-col justify-center items-center'
                      >
                        {/* <Progress type='circle' width={50} percent={30} status='none' /> */}
                        {item?.score ? <Progress showInfo={false} width={40} strokeWidth={22} strokeLinecap='butt' strokeColor='#7F56D9' trailColor='#F4EBFF' type='circle' percent={item?.score} /> : <Progress showInfo={false} width={40} strokeWidth={22} strokeLinecap='butt' strokeColor='#7F56D9' trailColor='#F4EBFF' type='circle' percent={0} />}
                      </Col>
                    </Row>
                  </Col>
                  <Col xl={3} lg={3} md={3} sm={3} xs={3} className='flex justify-center items-center'>
                    <Badge
                      count={item?.assignmentGrade?.[0]?.title}
                      style={{
                        backgroundColor: '#52c41a',
                        padding: '0 10px'
                      }}
                    />
                  </Col>
                  <Col xl={3} lg={3} md={3} sm={3} xs={3} className='flex flex-col justify-center items-center'>
                    {item?.submittedDate ? (
                      <>
                        <div>{moment(item?.submittedDate).format('MM/DD/YYYY')}</div>
                        <div>{moment(item?.submittedDate).format('hh:mm a')}</div>
                      </>
                    ) : (
                      <span
                        style={{
                          color: 'red'
                        }}
                      >
                        NOT SUBMITED
                      </span>
                    )}
                  </Col>
                  <Col xl={3} lg={3} md={3} sm={3} xs={3} className='flex justify-center items-center'>
                    <ADButton type='text' disabled={!item?.submittedDate} onClick={() => navigate(`/my-classrooms/assignment/view-work/${item?._id}`)}>
                      <div className='flex'>
                        <FaChartLine className='text-gray-400 text-2xl' />
                      </div>
                    </ADButton>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        )}
      </div>
    </MainLayout>
  );
}

export default StudentDashboard;
