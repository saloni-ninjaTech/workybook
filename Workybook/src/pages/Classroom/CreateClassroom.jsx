import { Col, Form, Input, Modal, Row, Table, Typography } from 'antd';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoHeader from '../../components/common/LogoHeader';
import MainContent from '../../components/CreateClass/mainContent';
import ImportContent from '../../components/CreateClass/importContent';
import ManualContent from '../../components/CreateClass/manualContent';
import AddStudentContent from '../../components/CreateClass/addStudentContent';
import ADButton from '../../components/antd/ADButton';

function CreateClassroom() {
  const [createClassPopup, setCreateClassPopup] = useState(false);
  const [rowSelection, setRowSelection] = useState(null);
  const [isImport, setIsImport] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [manualStep, setManualStep] = useState(1);
  const dispatch = useDispatch();

  const login = () => {
    dispatch(setUserLoggedIn(true));
  };
  return (
    <>
      <LogoHeader />
      <Typography.Title level={3} className='m-auto !mt-[50px] !mb-[35px] text-center'>
        Welcome Mrs. Bieries!
      </Typography.Title>
      <div className='bg-gray-100 w-[90%] max-w-[1121px] min-h-[176px] text-center m-auto rounded-[12px]'>
        <p className='pt-[17px] text-lg pb-[0px]'>Start using Workybooks in your classroom with your students!</p>
        <p className='text-sm pb-[31px]'>With classrooms you can add students and digitally assign worksheets, grade and generate student progress reports.</p>
        <ADButton
          type='primary'
          className='m-auto mb-[17px]'
          onClick={() => {
            setCreateClassPopup(true);
            setIsImport(false);
            setIsManual(false);
          }}
        >
          CREATE MY FIRST CLASSROOM
        </ADButton>
      </div>
      <p className='mt-[107px] mb-[39px] text-center text-baseline w-[85%] m-auto'>Don’t wish to create a Classroom yet? Select the grade you want to work with</p>

      <div className='w-full max-w-[620px] min-h-[203px] m-auto !pb-[50px]'>
        <Row gutter={[16, 16]} className='text-center !m-[0px]'>
          <Col lg={6} xs={12}>
            <Link to='/'>
              <ADButton type='success' className='w-[125px] h-[90px]'>
                <p className='text-[10px]'>GRADE</p>
                <Typography.Title level={1}>PreK</Typography.Title>
              </ADButton>
            </Link>
          </Col>
          <Col lg={6} xs={12}>
            <Link to='/'>
              <ADButton type='success' className='w-[125px] h-[90px]'>
                <p className='text-[10px]'>GRADE</p>
                <Typography.Title level={1}>K</Typography.Title>
              </ADButton>
            </Link>
          </Col>
          <Col lg={6} xs={12}>
            <Link to='/'>
              <ADButton type='success' className='w-[125px] h-[90px]'>
                <p className='text-[10px]'>GRADE</p>
                <Typography.Title level={1}>1</Typography.Title>
              </ADButton>
            </Link>
          </Col>
          <Col lg={6} xs={12}>
            <Link to='/'>
              <ADButton type='success' className='w-[125px] h-[90px]'>
                <p className='text-[10px]'>GRADE</p>
                <Typography.Title level={1}>2</Typography.Title>
              </ADButton>
            </Link>
          </Col>
          <Col lg={3} xs={0}>
            &nbsp;
          </Col>
          <Col lg={6} xs={12}>
            <Link to='/'>
              <ADButton type='success' className='w-[125px] h-[90px]'>
                <p className='text-[10px]'>GRADE</p>
                <Typography.Title level={1}>3</Typography.Title>
              </ADButton>
            </Link>
          </Col>
          <Col lg={6} xs={12}>
            <Link to='/'>
              <ADButton type='success' className='w-[125px] h-[90px]'>
                <p className='text-[10px]'>GRADE</p>
                <Typography.Title level={1}>4</Typography.Title>
              </ADButton>
            </Link>
          </Col>
          <Col lg={6} xs={24}>
            <Link to='/'>
              <ADButton type='success' className='w-[125px] h-[90px]'>
                <p className='text-[10px]'>GRADE</p>
                <Typography.Title level={1}>5</Typography.Title>
              </ADButton>
            </Link>
          </Col>
          <Col lg={3} xs={0}>
            &nbsp;
          </Col>
        </Row>
      </div>

      <Modal
        closeIcon={<div />}
        open={createClassPopup}
        onCancel={() => {
          setCreateClassPopup(false);
        }}
        footer={false}
        centered
        width={489}
        bodyStyle={{
          height: 600,
          borderRadius: 16
        }}
      >
        {!isManual && !isImport && <MainContent setIsImport={setIsImport} setIsManual={setIsManual} setManualStep={setManualStep} />}
        {isImport && <ImportContent rowSelection={rowSelection} setCreateClassPopup={setCreateClassPopup} />}
        {isManual && manualStep === 1 && <ManualContent setManualStep={setManualStep} />}
        {isManual && manualStep === 2 && <AddStudentContent setCreateClassPopup={setCreateClassPopup} />}
      </Modal>
    </>
  );
}

export default CreateClassroom;
