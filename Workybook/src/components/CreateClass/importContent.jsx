import { Button, Col, Row, Table, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import { popupModalComponent } from '../../lib/utils';
import ADButton from '../antd/ADButton';

function ImportContent({ rowSelection, setCreateClassPopup }) {
  const { googleClassRoom } = useSelector((state) => state.classes);
  const [classData, setClassData] = useState([]);
  useEffect(() => {}, [googleClassRoom]);
  const scroll = {
  };
  scroll.y = 200;
  const tableProps = {
    rowSelection,
    scroll
  };
  const columns = [
    // {
    //   title: 'Class',
    //   width: 100,
    //   dataIndex: 'class',
    //   key: 'class',
    //   fixed: 'left',
    //   sorter: (a, b) => a.class - b.class
    // },
    // {
    //   title: 'Grade',
    //   width: 100,
    //   dataIndex: 'grade',
    //   key: 'grade',
    //   fixed: 'left'
    // },
    // {
    //   title: 'Students',
    //   dataIndex: 'students',
    //   key: 'students',
    //   width: 150
    // }
  ];
  const data = [];
  for (let i = 0; i < 100; i += 1) {
    data.push({
      key: i,
      class: '3B',
      grade: 3,
      students: 50
    });
  }
  return (
    <>
      <Typography.Title level={1} className='!text-2xl md:!text-2xl mt-[30px] text-center'>
        Import Classroom
      </Typography.Title>
      <Typography.Title level={5} className='!font-normal !mt-[16px] !mb-[35px] !text-[14px] text-center'>
        Please select the classrooms you wish
        <br />
        to import
      </Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{
              y: 200
            }}
            pagination={false}
            {...tableProps}
          />
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
            CONTINUE
          </ADButton>
        </Col>
      </Row>
    </>
  );
}

export default ImportContent;
