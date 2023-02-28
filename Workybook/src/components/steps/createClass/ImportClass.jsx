import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { forEach } from 'lodash';
import { toast } from 'react-toastify';
import ADTitle from '../../antd/ADTitle';
import ADButton from '../../antd/ADButton';
import { getGoogleClassRoomDataInsert, getClassrooms } from '../../../app/features/classroom/classroomSlice';

export default function ImportClass({ next }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const classState = useSelector((state) => state?.classroom);
  const [classData, setClassData] = useState([]);
  const [classDataSubmit, setClassDataSubmit] = useState([]);
  const [buttonEnable, setButtonEnable] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (classState?.googleClassRoom?.classroom.length > 0) {
      // const dataResult= classState?.googleClassRoom?.classroom?map((item)=>{
      //   return {
      //     key: '1',
      //     class: 'John',
      //     grade: 'Brown',
      //     students: 32
      //   }
      // })
      setButtonEnable(true);
      const arrData = [];
      classState?.googleClassRoom?.classroom?.forEach((item, index) => {
        arrData.push({
          key: item?.id,
          classId: item?.id,
          name: item?.classGrade,
          grade: item?.grade || '',
          students: item?.studentLength
        });
      });
      setClassData(arrData);
    }
  }, [classState]);
  const getClassRoomdataAPIInsert = () => {
    try {
      dispatch(getGoogleClassRoomDataInsert({
        importClass: classDataSubmit
      })).then((res) => {
        dispatch(getClassrooms());
        next();
      // setCurrent(4);
      });
    } catch (error) {
      toast.error(error);
    }
  };
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys, value) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        }
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        }
      }
    ]
  };
  useEffect(() => {
    if (selectedRowKeys?.length !== 0) {
      const resultData = [];
      selectedRowKeys?.forEach((item) => {
        resultData.push(classData?.filter((d) => d.key === item)[0]);
      });
      setClassDataSubmit(resultData);
      setButtonEnable(true);
    } else {
      setClassDataSubmit([]);
      setButtonEnable(false);
    }
  }, [selectedRowKeys]);
  const columns = [
    {
      title: 'Classid',
      dataIndex: 'classId'
      //   render: (text) => <div>{text}</div>
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Grade',
      dataIndex: 'grade'
    },
    {
      title: 'Students',
      dataIndex: 'students'
    }
  ];
  // const data = [
  //   {
  //     key: '1',
  //     class: 'John',
  //     grade: 'Brown',
  //     students: 32

  //   },
  //   {
  //     key: '2',
  //     class: 'Max',
  //     grade: 'Smith',
  //     students: 18

  //   },
  //   {
  //     key: '3',
  //     class: 'Deny',
  //     grade: 'Josh',
  //     students: 20

  //   }
  // ];
  return (
    <div className='flex flex-col items-center'>
      <ADTitle level={2}>Import Classroom</ADTitle>
      <div className='py-4 text-dark text-lg'>Please select the classrooms you wish to import</div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={classData} />
      {buttonEnable && (
      <ADButton
        size='large'
        className='my-4'
        type='primary'
        onClick={() => {
          getClassRoomdataAPIInsert();
        }}
      >
        Continue
      </ADButton>
      )}

    </div>
  );
}
