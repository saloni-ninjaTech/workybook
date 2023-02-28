import React, { useEffect, useState } from 'react';
import { Avatar, Col, Image, List, Row, Space } from 'antd';
import { FaChartLine, FaPencilAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EditStudentModal from '../../../modals/EditStudentModal';
import ADButton from '../../../antd/ADButton';
import { getStudents } from '../../../../app/features/students/studentsSlice';

function Student({ item }) {
  const { currentClass } = useSelector((state) => state.classroom);
  const dispatch = useDispatch();
  const [showEditStudent, setShowEditStudent] = useState(false);

  useEffect(() => {
    dispatch(getStudents(currentClass?._id));
  }, [students]);

  const navigate = useNavigate();

  const onStudentClickHandler = (e) => {
    navigate(`student-dashboard/${e._id}`);
  };

  const showEditStudentModal = (data) => {
    dispatch(setStudent(data));
    setShowEditStudent(true);
  };

  const handleEditStudentOk = () => {
    setShowEditStudent(false);
  };

  const handleEditStudentCancel = () => {
    setShowEditStudent(false);
  };

  const editStudentModal = <EditStudentModal closable={false} open={showEditStudent} onOk={handleEditStudentOk} onCancel={handleEditStudentCancel} />;

  return (
    <List.Item>
      {editStudentModal}
      <Row gutter={[0, 16]} className='w-full'>
        <Col xl={6} md={6} sm={8} xs={10} className='flex items-center'>
          <Space>
            <Avatar icon={<Image src={item.avatar} alt='img' />} />
            <div className='inter-font text-sm ml-5'>
              <ADButton type='text' className='font-medium !p-0' onClick={() => onStudentClickHandler(item)}>{`${item.firstName} ${item.lastName}`}</ADButton>
              <div className='font-normal text-gray-400'>{item.userName}</div>
            </div>
          </Space>
        </Col>
        <Col xl={12} md={10} sm={10} xs={8} className='flex justify-center'>
          <Row className='rounded-2xl md:px-4 px-2 py-2 border border-solid border-slate-300'>
            <Col sm={12} xs={24}>
              <div className='flex items-center flex-col mx-2 lg:mx-4'>
                <div>ACTIVITIES</div>
                <div className='font-bold'>{item?.activity?.activities ?? '-'}</div>
              </div>
            </Col>
            <Col sm={12} xs={24}>
              <div className='flex items-center flex-col mx-2 lg:mx-4'>
                <div className='whitespace-nowrap'>TIME PLAYED</div>
                <div className='font-bold'>{item?.activity?.timePlayed ?? '-'}</div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col xl={3} md={4} sm={3} xs={3} className='flex justify-center items-center'>
          <FaChartLine className='text-gray-400 text-lg' />
        </Col>
        <Col xl={3} md={4} sm={3} xs={3} className='flex justify-center items-center'>
          <div className='flex'>
            <ADButton type='text' className='!p-0' onClick={() => showEditStudentModal(item)}>
              <FaPencilAlt className='text-gray-400 text-lg' />
            </ADButton>
          </div>
        </Col>
      </Row>
    </List.Item>
  );
}

export default Student;
