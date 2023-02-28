import { Col, Row, Space, Typography } from 'antd';
import React from 'react';
import SubjectComponent from '../Home/subjectComponent';
import CcsComponent from '../Home/CcsComponent';

function TopSubjectComponent({ subjectList = [], ccsList = [] }) {
  return (
    <div className='text-center md:text-left !mt-[20px] xl:mx-16 mx-2'>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={16} lg={16} className='border-b md:border-solid border-x-0 border-t-0 pb-3'>
          <Typography.Text className='font-bold text-[11px] sm:mb-0 !mb-[20px] block'>Browse by Subject</Typography.Text>
          <div className='border-r border-y-0 border-l-0 md:border-solid flex overflow-x-auto'>
            {subjectList?.map((item) => (
              <SubjectComponent key={item._id} subjectImage={item.image} subjectName={item.title} subjectId={item._id} />
            ))}
          </div>
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} className='text-center md:text-left !p-0 border-b md:border-solid border-x-0 border-t-0 pb-3'>
          <Typography.Text className='font-bold text-[11px] md:ml-[10px] w-full  mb-[20px] block'>Browse by Common core standards</Typography.Text>
          <div className='flex overflow-x-auto ml-4'>
            {ccsList?.map((item) => (
              <CcsComponent key={item._id} ccsImage={item.image} ccsName={item.title} ccsId={item._id} />
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default TopSubjectComponent;
