import { Button, Col, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ADButton from '../../components/antd/ADButton';
import LogoHeader from '../../components/common/LogoHeader';

function SelectClassroom() {
  return (
    <>
      <LogoHeader />
      <Typography.Title level={3} className='m-auto !mt-[50px] !mb-[35px] text-center'>
        Welcome Mrs. Bieries!
      </Typography.Title>
      <div className='w-[90%] max-w-[1121px] min-h-[176px] text-center m-auto rounded-[12px]'>
        <p className='pt-[17px] text-lg pb-[0px]'>Select the classroom you want to work with</p>
      </div>
      <div className='w-full max-w-[620px] min-h-[203px] m-auto !pb-[50px]'>
        <Row gutter={[16, 16]} className='text-center !m-[0px]'>
          <Col span={24}>
            <Link to='/'>
              <ADButton className='bg-gray-300 w-[223px] h-[90px]'>
                <p className='text-[10px]'>GRADE 3</p>
                <Typography.Title level={4}>Class 3A</Typography.Title>
              </ADButton>
            </Link>
          </Col>
          <Col span={24}>
            <Link to='/'>
              <ADButton className='bg-gray-300 w-[223px] h-[90px]'>
                <p className='text-[10px]'>GRADE 4</p>
                <Typography.Title level={4}>Class 4 Science</Typography.Title>
              </ADButton>
            </Link>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default SelectClassroom;
