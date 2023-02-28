import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Col, List, Progress, Row, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { CloseCircleOutlined } from '@ant-design/icons';
import { FaChartLine, FaCheck, FaClosedCaptioning, FaPencilAlt, FaTimes } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import moment from 'moment';
import ADTitle from '../../../../components/antd/ADTitle';
import ADSelect from '../../../../components/antd/ADSelect';
import ADButton from '../../../../components/antd/ADButton';
import dummy from '../../../../assets/images/worksheet.png';
import { setStudent } from '../../../../app/features/students/studentsSlice';
import { getSubmittedAssignmentDetail, getSubmittedAssignments, getAssignmentGradeList, updateGradeList } from '../../../../app/features/assignment/assignmentSlice';

function ViewAssignmentReport() {
  const { currentClass } = useSelector((state) => state.classroom);
  const { currentStudent, students } = useSelector((state) => state.students);

  const [updatedGrade, setUpdatedGrade] = useState([]);
  const [viewPageCount, setViewPageCount] = useState(1);
  const { submittedAssignmentDetail, submittedAssignments, assignmentGradeList } = useSelector((state) => state.assignment);
  const dev = useSelector((state) => state.assignment);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // const updatedAssignmentGradeList = assignmentGradeList?.list?.map((item) => ({
  //   label: item?.title,
  //   value: item?._id,
  //   color: item?.color
  // }));
  // const assigmentDetails = submittedAssignmentDetail?.submittedAssignment?.[0]?.totalScore || [];
  // const assignmentGrade = submittedAssignmentDetail?.submittedAssignment?.[0]?.assignmentGrade || [];
  // const getIndex = updatedAssignmentGradeList?.findIndex((item) => item.value === assignmentGrade._id);

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

  const assignmentOptions = submittedAssignments?.list?.length ?
    submittedAssignments?.list?.map(({ _id: value, title: label, ...rest }) => ({
      value,
      label,
      ...rest
    })) :
    [
      {
        value: '',
        label: 'No Assignment'
      }
    ];
  const getGradeList = async () => {
    await dispatch(getAssignmentGradeList());
  };
  useEffect(() => {
    getGradeList();
  }, []);

  useEffect(() => {
    const updateGradeDataArr = {
      studentId: currentStudent?._id,
      assignmentId: id,
      assignmentGrade: updatedAssignmentGradeList[getIndex]
    };
    setUpdatedGrade([...updatedGrade, updateGradeDataArr]);
  }, [assignmentGradeList]);

  const getDataRequest = async (asId) => {
    if (asId) {
      await dispatch(
        getSubmittedAssignmentDetail({
          assignmentId: asId,
          studentId: currentStudent?._id
        })
      );
      await dispatch(
        getSubmittedAssignments({
          studentId: currentStudent?._id,
          classId: currentClass?._id
        })
      );
    }
  };

  useEffect(() => {
    if (id) {
      getDataRequest(id);
    }
  }, [id]);

  const onStudentChangeHandler = async (e) => {
    const cs = await students?.list.find((item) => item._id === e);

    await dispatch(setStudent(await cs));
    await dispatch(
      getSubmittedAssignments(
        await {
          studentId: e,
          classId: currentClass?._id
        }
      )
    );
    await dispatch(
      getSubmittedAssignmentDetail({
        assignmentId: id,
        studentId: cs?._id
      })
    );
  };
  const onAssignmentChangeHandler = async (assignmentId) => {
    setViewPageCount(viewPageCount + 1);
    navigate(`/my-classrooms/assignment/view-work/${assignmentId}`);
  };

  const onChangeGrade = (value) => {
    let newTempArr = [];
    const newTempObj = updatedGrade?.[0];
    newTempObj.assignmentGrade = value;
    newTempArr = [...newTempArr, newTempObj];
    setUpdatedGrade(newTempArr);
  };

  const onGradeUpdate = async () => {
    await dispatch(updateGradeList(updatedGrade));
  };

  const updatedAssignmentGradeList = assignmentGradeList?.list?.map((item) => ({
    label: item?.title,
    value: item?._id,
    color: item?.color
  }));
  const assigmentDetails = submittedAssignmentDetail?.submittedAssignment?.[0]?.totalScore || [];
  const assignmentGrade = submittedAssignmentDetail?.submittedAssignment?.[0]?.assignmentGrade || [];
  const getIndex = updatedAssignmentGradeList?.findIndex((item) => item.value === assignmentGrade._id);

  const selected = React.useMemo(() => {
    const result = assignmentOptions.find((i) => i.value === id);
    if (result) {
      return result;
    }
    return assignmentOptions[0];
  }, [assignmentOptions]);

  return (
    <div>
      <div
        className='border-bottom'
        style={{
          borderBottom: '2px solid black',
          padding: '10px'
        }}
      >
        <Row gutter={[16, 0]}>
          <Col xl={22} md={22} sm={22} xs={22}>
            <ADTitle level={5}>{currentClass?.name || ''}</ADTitle>
          </Col>

          <Col xl={2} md={2} sm={2} xs={2} className='md:text-right'>
            <CloseCircleOutlined
              className='!text-danger font-bold'
              style={{
                fontSize: '26px'
              }}
              onClick={() => navigate(-viewPageCount)}
            />
          </Col>
        </Row>
        <Row gutter={[16, 0]}>
          <Col xl={4} md={4} sm={4} xs={6} className='text-center'>
            <ADTitle level={3} className='center'>
              Student work
            </ADTitle>
          </Col>
          <Col xl={8} md={8} sm={8} xs={6}>
            <ADSelect className='w-60' value={currentStudent?.fullName} onChange={(e) => onStudentChangeHandler(e)} options={studentsOptions} />
          </Col>
        </Row>
        <Row gutter={[20, 0]} className='center items-center'>
          <Col xl={4} md={4} sm={8} xs={10}>
            <ADTitle className='text-center' level={4}>
              Assignment
            </ADTitle>
          </Col>
          <Col xl={5} md={5} sm={8} xs={10}>
            <ADSelect className='w-60' value={selected} onChange={(e) => onAssignmentChangeHandler(e)} options={assignmentOptions} />
          </Col>
          <Col xl={7} md={7} sm={8} xs={10}>
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
                <div className='font-bold'>{assigmentDetails?.time ? assigmentDetails?.time : '-'}</div>
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
                <div className='font-bold'>{assigmentDetails?.currectAnswer || '-'}</div>
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
                <div className='font-bold'>{assigmentDetails?.wrongAnswer || '-'}</div>
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
                <div className='font-bold'>{assigmentDetails?.blankAnswer || '-'}</div>
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
                <div className='font-bold'>{`${assigmentDetails?.score ? assigmentDetails?.score : 0}%`}</div>
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
                {assigmentDetails?.score ? <Progress showInfo={false} width={40} strokeWidth={22} strokeLinecap='butt' strokeColor='#7F56D9' trailColor='#F4EBFF' type='circle' percent={assigmentDetails?.score} /> : <Progress showInfo={false} width={40} strokeWidth={22} strokeLinecap='butt' strokeColor='#7F56D9' trailColor='#F4EBFF' type='circle' percent={0} />}
              </Col>
            </Row>
          </Col>
          <Col xl={4} md={4} sm={6} xs={10}>
            <div className='flex items-center'>
              <span
                style={{
                  marginRight: 10
                }}
              >
                GRADE
              </span>
              <Select
                value={submittedAssignmentDetail?.submittedAssignment?.[0]?.assignmentGrade?.title}
                onChange={onChangeGrade}
                placeholder='select'
                style={{
                  width: '100px'
                }}
                options={updatedAssignmentGradeList || []}
              />
              <ADButton type='text' onClick={onGradeUpdate}>
                <FaCheck className='text-slate-800' />
              </ADButton>
            </div>
          </Col>
          <Col xl={4} md={4} sm={6} xs={10} className='md:text-right'>
            <span className='font-bold'>Worksheet 1/4</span>
          </Col>
        </Row>
      </div>
      <div>
        <Row
          style={{
            textAlign: 'center'
          }}
        >
          <Col xl={24} md={24} sm={24} xs={24}>
            <img src={submittedAssignmentDetail?.submittedAssignment?.[0]?.totalScore?.content?.thumbnail} width='550px' height='650px' alt='worksheet' />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ViewAssignmentReport;
