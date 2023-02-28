/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react';
import { Col, Image, List, Progress, Row, Space, Tag } from 'antd';
import { FaPencilAlt } from 'react-icons/fa';
import { BsArrowRightCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import dummyImage from '../../../../assets/images/dummyImage.png';
import ADButton from '../../../../components/antd/ADButton';
import EditAssignModal from '../../../../components/modals/EditAssignModal';
import { setAssignment } from '../../../../app/features/assignment/assignmentSlice';

function AssignmentItem({ item, classId }) {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onAssignMentClick = (e) => {
    // dispatch(
    //   getStudentAssignmentDetail({
    //     assignmentId: e?._id,
    //     classId
    //   })
    // );
    navigate(`assignment/${e?._id}`);
  };

  const showEditAssignModal = (e) => {
    dispatch(
      setAssignment({
        assignment: e
      })
    );
    setIsAssignModalOpen(true);
  };

  const handleAssignModalOk = () => {
    setIsAssignModalOpen(false);
  };

  const handleAssignModalCancel = () => {
    setIsAssignModalOpen(false);
  };

  const editAssignModal = <EditAssignModal open={isAssignModalOpen} onOk={handleAssignModalOk} onCancel={handleAssignModalCancel} />;

  return (
    <List.Item>
      {editAssignModal}
      <Row gutter={16} className='w-full'>
        <Col xl={6} md={6} sm={8} xs={10} className='flex items-center'>
          <ADButton type='text' onClick={() => onAssignMentClick(item)}>
            <Space>
              <Image src={dummyImage} className='w-full aspect-[3/4] max-w-[100px]' />
              <div className='inter-font text-sm ml-5'>
                <div className='font-medium'>{item?.title}</div>
                <div className='font-normal text-gray-400'>
                  {item?.content?.[0]?.stds_topic?.slice(0, 2)?.map((topic, index) => (
                    <span key={topic}>{`${topic}${index < item?.content?.[0]?.stds_topic?.length - 1 ? ', ' : ''}`}</span>
                  ))}
                </div>
              </div>
            </Space>
          </ADButton>
        </Col>
        <Col xl={2} md={10} sm={10} xs={8} className='flex justify-center items-center'>
          <Tag color={item?.status === 'Unassigned' ? 'warning' : item?.status === 'Active' ? 'success' : item?.status === 'Closed' ? 'error' : 'default'} className='shadow'>
            {item?.status}
          </Tag>
        </Col>
        <Col xl={3} md={4} sm={3} xs={3} className='flex justify-center items-center'>
          <div className='whitespace-pre-wrap'>
            {item?.assignedTo && item?.assignedTo === 'Classroom' ?
              'All' :
              item?.assignedStudents.length >= 3 ?
                item?.assignedStudents?.slice(0, 3).map((student, index) => <span key={student?._id}>{`${student?.fullName}${index < item?.assignedStudents.slice(0, 3)?.length - 1 ? ', ' : ''}`}</span>) :
                item?.assignedStudents?.map((student, index) => <span key={student?._id}>{`${student?.fullName}${index < item?.assignedStudents.length - 1 ? ', ' : ''}`}</span>)}
            {item?.assignedStudents.length >= 3}
          </div>
        </Col>
        <Col xl={3} md={4} sm={3} xs={3} className='flex justify-center items-center flex-col'>
          <div>{moment(item?.endDate).format('MM/DD/YYYY')}</div>
          <div>{moment(item?.endDate).format('hh:mm a')}</div>
        </Col>
        <Col xl={2} md={4} sm={3} xs={3} className='flex justify-center items-center'>
          <Progress percent={item?.turnout} showInfo={false} />
        </Col>
        <Col xl={3} md={4} sm={3} xs={3} className='flex justify-center items-center'>
          <Progress showInfo={false} width={40} strokeWidth={22} strokeLinecap='butt' strokeColor='#7F56D9' trailColor='#F4EBFF' type='circle' percent={item?.avg_score} />
        </Col>
        <Col xl={2} md={4} sm={3} xs={3} className='flex justify-center items-center'>
          <div className='flex'>
            <ADButton type='text' className='!p-0 text-secondary text-slate-400 text-xl' onClick={() => showEditAssignModal(item)}>
              <FaPencilAlt />
            </ADButton>
          </div>
        </Col>
        <Col xl={3} md={4} sm={3} xs={3} className='flex justify-center items-center'>
          <ADButton type='text' onClick={() => onAssignMentClick(item)} className='flex text-4xl text-slate-400'>
            <BsArrowRightCircle />
          </ADButton>
        </Col>
      </Row>
    </List.Item>
  );
}

export default AssignmentItem;
