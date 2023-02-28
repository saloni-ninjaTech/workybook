import React, { useEffect, useState } from 'react';
import { Avatar, Col, Image, List, Row, Space } from 'antd';
import { FaChartLine, FaPencilAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ADButton from '../../antd/ADButton';
import { setClass } from '../../../app/features/classroom/classroomSlice';
import { getStudents, setStudent } from '../../../app/features/students/studentsSlice';
import EditStudentModal from '../../modals/EditStudentModal';
import AddStudentsModal from '../../modals/AddStudentsModal';
import dummyAvatar from '../../../assets/images/avatar.png';
import Spinner from '../../spinner/Spinner';

const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
function StudentsPage() {
  const { classes, currentClass, currentCreateClass } = useSelector((state) => state.classroom);
  const { students, isLoading } = useSelector((state) => state.students);

  const [showEditStudent, setShowEditStudent] = useState(false);
  const [showAddStudents, setShowAddStudents] = useState(false);
  const [studentButtonEnable, setStudentButtonEnable] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateStudentList = async () => {
    if (await classes?.list?.length) {
      dispatch(setClass(currentCreateClass?.classroom?.name && classes?.list?.[0]));
    }
    await dispatch(getStudents(currentCreateClass?.classroom?._id ? currentCreateClass?.classroom?._id : currentClass?._id));
  };
  useEffect(() => {
    updateStudentList();
    // dispatch(getStudents(currentCreateClass?.classroom?._id));
  }, []);
  useEffect(() => {
    if (currentClass) {
      setStudentButtonEnable(true);
    }
  }, [currentClass, currentCreateClass]);

  const header = (
    <Row>
      <Col xl={6} md={6} sm={8} xs={10}>
        <div className='inter-font font-medium text-xs'>NAME</div>
      </Col>
      <Col xl={12} md={10} sm={10} xs={8}>
        <div className='text-center inter-font font-medium text-xs'>ACTIVITY</div>
      </Col>
      <Col xl={3} md={4} sm={3} xs={3}>
        <div className='text-center inter-font font-medium text-xs'>EDIT</div>
      </Col>
    </Row>
  );

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

  const addStudentsModal = <AddStudentsModal closable={false} open={showAddStudents} onOk={() => setShowAddStudents(false)} onCancel={() => setShowAddStudents(false)} />;
  const editStudentModal = <EditStudentModal closable={false} open={showEditStudent} onOk={handleEditStudentOk} onCancel={handleEditStudentCancel} />;

  return (
    <div className='xl:px-20 lg:px-16 md:px-10 px-0'>
      {addStudentsModal}
      {editStudentModal}
      {isLoading ? (
        <Spinner style={{
          marginTop: '100px'
        }}
        />
      ) : (
        <Space direction='vertical' size='large' className='flex'>
          <div className='flex ant-row-end'>
            {studentButtonEnable && (
            <ADButton type='primary' onClick={() => setShowAddStudents(true)}>
              ADD STUDENTS
            </ADButton>
            )}
          </div>
          <List
            className='rounded-t-lg with-header'
            header={header}
            itemLayout='horizontal'
            dataSource={students?.list || []}
            bordered
            renderItem={(item) => (
              <List.Item>
                <Row gutter={[0, 16]} className='w-full'>
                  <Col xl={6} md={6} sm={8} xs={10} className='flex items-center'>
                    <Space>
                      <Avatar icon={<Image src={item.avatar ? `${IMAGE_URL}/${item.avatar}` : dummyAvatar} preview={false} alt='img' />} />
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
                    <div className='flex'>
                      <ADButton type='text' className='!p-0' onClick={() => showEditStudentModal(item)}>
                        <FaPencilAlt className='text-gray-400 text-lg' />
                      </ADButton>
                    </div>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Space>
      )}
    </div>
  );
}

export default StudentsPage;
