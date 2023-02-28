import { Button, Col, Input, Row, Typography } from 'antd';
import React from 'react';
import { popupModalComponent } from '../../lib/utils';
import ADButton from '../antd/ADButton';

function AddStudentContent({ setCreateClassPopup }) {
  return (
    <>
      <Typography.Title level={1} className='!text-2xl md:!text-2xl mt-[30px] text-center'>
        Add Students
      </Typography.Title>
      <Typography.Title level={5} className='!font-normal !mt-[16px] !mb-[30px] !text-[14px] text-center'>
        Please provide the classroom details
      </Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={24} className='text-center'>
          <ADButton className='w-[168px] h-[60px] m-auto !mb-[30px]'>Import</ADButton>
        </Col>
        <Col span={24} className='text-center'>
          <p className='text-[13px]'>
            Or, enter student names manually.
            <br />
            Please enter student names as Frist name Last Name - one per line.
          </p>
        </Col>
        <Col span={24} className='text-center'>
          <Input.TextArea className='!h-[150px] rounded-[8px] m-auto' />
        </Col>
        <Col span={24} className='text-center'>
          <ADButton
            type='primary'
            className='mt-[63px] m-auto'
            onClick={() => {
              setCreateClassPopup(false);
              popupModalComponent('error', 'Classroom(s) created', '2 classrooms and 40 students have been imported to Workybooks', true);
            }}
          >
            ADD
          </ADButton>
        </Col>
      </Row>
    </>
  );
}

export default AddStudentContent;
