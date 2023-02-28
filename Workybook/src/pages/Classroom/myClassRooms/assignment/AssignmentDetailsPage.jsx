/* eslint-disable no-return-assign */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Avatar, Badge, Col, List, Progress, Row, Select, Space, Image, Input } from 'antd';
import { FaChartLine, FaCheck, FaPencilAlt, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import ADButton from '../../../../components/antd/ADButton';
import dummyImage from '../../../../assets/images/dummyImage.png';
import dummyAvatar from '../../../../assets/images/avatar.png';
import ADTitle from '../../../../components/antd/ADTitle';
import ADSelect from '../../../../components/antd/ADSelect';
import MainLayout from '../../../../components/layout/MainLayout';
import { getStudentAssignmentDetail, getAssignmentGradeList, updateGradeList, setAssignment, getAssignments } from '../../../../app/features/assignment/assignmentSlice';
import ADImage from '../../../../components/antd/ADImage';
import { setStudent, getStudents } from '../../../../app/features/students/studentsSlice';
import ExportAssignmentReport from './ExportAssignmentReport';
import EditAssignModal from '../../../../components/modals/EditAssignModal';

const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
function AssignmentDetailsPage() {
  const assignmentList = useSelector((state) => state.assignment?.assignments);
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isEditableInput, setIsEditableInput] = useState(false);
  const [updatedGradeList, setUpdatedGradeList] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentClass } = useSelector((state) => state.classroom);
  const { studentAssignmentDetail, assignmentGradeList, assignments, isLoading, isError, message } = useSelector((state) => state.assignment);
  const { currentStudent, students } = useSelector((state) => state.students);

  const updatedAssignmentList = assignments?.map((item) => ({
    label: item?.title,
    value: item?._id
  }));
  const getIndex = updatedAssignmentList?.findIndex((item) => item.value === id);

  const updatedAssignmentGradeList = assignmentGradeList?.list?.map((item) => ({
    label: item?.title,
    value: item?._id,
    color: item?.color
  }));

  const [currentSelectedAssignment, setCurrentSelectedAssignment] = useState(updatedAssignmentList?.[getIndex] || {
  });

  const onAssignmentApiCall = async (assignmentId) => {
    await dispatch(
      getStudentAssignmentDetail({
        assignmentId,
        classId: currentClass?._id
      })
    );
    await dispatch(getStudents(currentClass?._id));
  };
  const getGradeList = async () => {
    await dispatch(getAssignmentGradeList());
  };

  useEffect(() => {
    onAssignmentApiCall(id);
    getGradeList();
  }, []);

  useEffect(() => {
    if (isAssignModalOpen === false) {
      onAssignmentApiCall(id);
      getGradeList();
    }
  }, [isAssignModalOpen]);

  const { assignmentDetails, assignmentItems, assignmentScore } = studentAssignmentDetail?.studentsAssignmentData || {
  };

  const exportAssignmentReportModal = <ExportAssignmentReport closable={false} open={modal} onOk={() => setModal(false)} onCancel={() => setModal(false)} />;

  const onChangeAssignment = (item) => {
    const getIndex1 = updatedAssignmentList?.findIndex((i) => i.value === item);
    setCurrentSelectedAssignment(updatedAssignmentList?.[getIndex1]);
    navigate(`/my-classrooms/assignment/${item}`);
    onAssignmentApiCall(item);
  };
  const onClickEditGrade = (value) => {
    setIsEditableInput(value);
    // Editable
    if (updatedGradeList?.length > 0) {
      dispatch(updateGradeList(updatedGradeList));
      onAssignmentApiCall(currentSelectedAssignment?.value);
    }
  };

  const onChangeGrade = (value, item) => {
    const newStudentObj = {
      assignmentId: item?.assignment,
      studentId: item?.student,
      assignmentGrade: value
    };
    setUpdatedGradeList([...updatedGradeList, newStudentObj]);
  };
  const navigateToViewWork = async (studentItem) => {
    const cs = await students?.list.find((item) => item._id === studentItem?.student);
    await dispatch(setStudent(await cs));
    navigate(`/my-classrooms/assignment/view-work/${studentItem?.assignment}`);
  };

  const handleAssignModalOk = () => {
    setIsAssignModalOpen(false);
  };

  const handleAssignModalCancel = () => {
    setIsAssignModalOpen(false);
  };

  const showEditAssignModal = async () => {
    const ca = await assignmentList?.find((assignment) => assignment?._id === id);
    await dispatch(
      setAssignment({
        assignment: ca
      })
    );
    await setIsAssignModalOpen(true);
  };

  const afterClose = () => {
    dispatch(getAssignments(currentClass?.classId));
  };

  const editAssignModal = <EditAssignModal afterClose={afterClose} open={isAssignModalOpen} onOk={handleAssignModalOk} onCancel={handleAssignModalCancel} />;

  return (
    <MainLayout>
      {editAssignModal}
      {/* {isError ? (
        <div
          className='text-center text-lg'
          style={{
            margin: '20px auto'
          }}
        >
          {message}
        </div>
      ) : ( */}
      <div>
        {exportAssignmentReportModal}

        <div className='px-4 py-5 w-full flex justify-between'>
          <Space size='large'>
            <ADTitle level={3}>Assignment</ADTitle>
            <ADSelect
              className='w-40'
              value={currentSelectedAssignment}
              onChange={onChangeAssignment}
              options={updatedAssignmentList || []}
            />

            <div className='flex'>
              <ADButton type='text' className='!p-0 text-secondary text-slate-400 text-xl' onClick={showEditAssignModal}>
                <FaPencilAlt />
              </ADButton>
            </div>
          </Space>
        </div>
        <div className='px-6'>
          <Row gutter={[16, 16]} className='border border-x-0 border-t-0 border-solid'>
            <Col xl={10}>
              <div>
                <div className='font-bold text-xs'>{`ASSIGNMENT ITEMS (${assignmentItems?.length} WORKSHEETS)`}</div>
              </div>
              <Space>
                {assignmentItems?.map((item, index) => {
                  if (index > 4) return null;
                  return <ADImage key={`image_${index}`} src={item?.thumbnail} onError={(e) => (e.target.src = dummyImage)} alt='Worksheet image' className='flex bg-slate-300 w-[60px] h-[60px] rounded-xl aspect[1/1] mt-4' />;
                })}
                {assignmentItems?.length > 4 ? (
                  <div className='font-bold text-xs px-4 pt-3 items-center'>
                    +
                    {assignmentItems?.length - 4}
                    MORE
                  </div>
                ) : null}
              </Space>
            </Col>
            <Col xl={7} className='border border-solid border-y-0 border-r-0'>
              <div>
                <div className='font-bold text-xs'>ASSIGNED TO</div>
              </div>
              <Space>
                {assignmentScore?.map((item, index) => {
                  if (index >= 3) return null;
                  return <Avatar key={`avtar_${index}`} src={item?.avatar ? `${IMAGE_URL}/${item?.avatar}` : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />;
                })}
                {assignmentScore?.length > 4 ? (
                  <div>
                    <div className='font-bold text-xs'>
                      +
                      {assignmentScore ? assignmentScore?.length - 3 : 0}
                      MORE
                    </div>
                  </div>
                ) : null}
              </Space>
            </Col>
            <Col xl={7} className='border border-solid border-y-0 border-r-0'>
              <Row gutter={16}>
                <Col xl={8}>
                  <div className='font-bold text-xs'>DUE DATE</div>
                  <div className='text-slate-400 pt-3'>
                    {moment(assignmentDetails?.endDate).format('DD/MM/YYYY hh:mm a')}
                    <br />
                  </div>
                </Col>
                <Col xl={8}>
                  <div className='font-bold text-xs'>TYPE</div>
                  <div className='text-slate-400 pt-3'>{assignmentDetails?.assignmentType || '-'}</div>
                </Col>
                <Col xl={8}>
                  <div className='font-bold text-xs'>POINTS</div>
                  <div className='text-slate-400 pt-3'>{assignmentDetails?.points || '-'}</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className='flex py-4 justify-between px-4 items-center'>
          <ADTitle level={4}>Assignment Progress</ADTitle>

          <Space size='large'>
            <ADButton type={isEditableInput ? 'medium' : 'primary'} onClick={() => onClickEditGrade(!isEditableInput)}>
              {isEditableInput ? 'Done' : 'Edit Grades'}
            </ADButton>
            <ADButton type='primary' onClick={() => setModal(true)}>
              Export Grades Reports
            </ADButton>
            <ADButton type='primary'>Assignment Report</ADButton>
          </Space>
        </div>
        <div className='mx-4 border border-solid border-t-0' />
        <div className='xl:px-20 lg:px-16 md:px-10 px-0 py-6'>
          <List
            pagination={{
              onChange: (page) => {},
              pageSize: 10
            }}
            className='rounded-t-lg with-header'
            header={(
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
              )}
            itemLayout='horizontal'
            dataSource={assignmentScore || []}
            bordered
            renderItem={(item) => {
              let findGradeIndex;
              if (item?.assignmentGrades?.length > 0) {
                findGradeIndex = updatedAssignmentGradeList?.findIndex((data, index) => data.value === item?.assignmentGrades?.[0]?._id);
              }
              return (
                <List.Item>
                  <Row gutter={[0, 16]} className='w-full'>
                    <Col xl={7} lg={7} md={7} sm={8} xs={10} className='flex items-center'>
                      <Row gutter={16} className='w-full'>
                        <Col xs={24} md={24} lg={12} xl={10} xxl={8}>
                          <ADImage alt='cover-img' src={item?.avatar ? `${IMAGE_URL}/${item?.avatar}` : dummyAvatar} className='aspect-[80px/100px]   rounded max-w-[80px] rounded' />
                        </Col>
                        <Col xs={24} md={24} lg={12} xl={14} xxl={16} className='inter-font text-sm'>
                          <div className='flex flex-col justify-center h-full lg:py-0 py-4'>
                            <div className='font-medium'>{item?.student_name}</div>
                            {/* <div className='font-normal text-gray-400'>Description</div> */}
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
                          <div className='font-medium text-lg'>{item?.time || '-'}</div>
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
                          <div className='font-bold text-lg'>{item?.totalCorrectAnswer || '-'}</div>
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
                          <div className='font-bold text-lg'>{item?.totalWrongAnswer || '-'}</div>
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
                          <div className='font-bold text-lg'>{item?.totalBlankAnswer || '-'}</div>
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
                          <div className='font-bold text-lg'>{`${item?.averagePercentage}%`}</div>
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
                          <Progress type='circle' width={50} percent={item?.averagePercentage} status='none' />
                        </Col>
                      </Row>
                    </Col>
                    <Col xl={3} lg={3} md={3} sm={3} xs={3} className='flex justify-center items-center'>
                      {isEditableInput ? (
                        item?.assignmentGrades.length > 0 ? (
                          <Select
                            defaultValue={
                                findGradeIndex ?
                                  updatedAssignmentGradeList[findGradeIndex] :
                                  {
                                    value: 0,
                                    label: 'Select'
                                  }
                              }
                            onChange={(value) => onChangeGrade(value, item)}
                            style={{
                              width: '100px'
                            }}
                            options={updatedAssignmentGradeList || []}
                          />
                        ) : null
                      ) : (
                        <Badge
                          count={item?.assignmentGrades?.[0]?.title}
                          style={{
                            backgroundColor: item?.assignmentGrades?.[0]?.color || '#52c41a',
                            padding: '0 10px'
                          }}
                        />
                      )}
                    </Col>
                    <Col xl={3} lg={3} md={3} sm={3} xs={3} className='flex justify-center items-center'>
                      <div>
                        {item?.submittedDate ? (
                          <>
                            <div>{moment(item?.submittedDate).format('DD/MM/YYYY')}</div>
                            <div>{moment(item?.submittedDate).format('hh:mm a')}</div>
                          </>
                        ) : (
                          <span
                            style={{
                              color: 'red',
                              textTransform: 'uppercase'
                            }}
                          >
                            Not Submitted
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col xl={3} lg={3} md={3} sm={3} xs={3} className='flex justify-center items-center'>
                      <ADButton disabled={!item?.submittedDate} type='text' onClick={() => navigateToViewWork(item)}>
                        <div className='flex'>
                          <FaChartLine className='text-gray-400 text-2xl' />
                        </div>
                      </ADButton>
                    </Col>
                  </Row>
                </List.Item>
              );
            }}
          />
        </div>
      </div>
      {/* )} */}
    </MainLayout>
  );
}

export default AssignmentDetailsPage;
