import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import readXlsxFile from 'read-excel-file/web-worker';
import { Table } from 'antd';
import { toast } from 'react-toastify';
import ADButton from '../../antd/ADButton';
import ADTitle from '../../antd/ADTitle';
import { classImportWithExcel, getClassrooms } from '../../../app/features/classroom/classroomSlice';

export default function GetCsvData({ onFileData }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [classData, setClassData] = useState([]);
  const [classDataSubmit, setClassDataSubmit] = useState([]);
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const schema = {
    classname: {
      prop: 'class',
      type: String
    },
    grade: {
      prop: 'grade',
      type: String
    },
    id: {
      prop: 'key',
      type: Number
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
    } else {
      setClassDataSubmit([]);
    }
  }, [selectedRowKeys]);
  const columns = [
    {
      title: 'ClassName',
      dataIndex: 'class'
      //   render: (text) => <div>{text}</div>
    },
    {
      title: 'Grade',
      dataIndex: 'grade'
    }
  ];

  const getExcelFile = (e) => {
    readXlsxFile(e.target.files[0], {
      schema
    }).then((rows) => {
      setClassData(rows.rows);
    });
  };
  const submitClassData = () => {
    dispatch(
      classImportWithExcel({
        classrooms: classDataSubmit
      })
    ).then((res) => {
      if (res?.error) {
        toast.error(error);
      } else {
        onFileData();
        dispatch(getClassrooms());
      }
    });
  };

  return (
    <div className='flex flex-col items-center'>
      {/* <ADTitle level={2}>Students Added</ADTitle>
       */}
      {/* <div className='py-4 text-dark text-lg my-16 text-center'>students has been added to Workybooks</div> */}
      {/* <ADButton size='large' type='primary' className='w-1/3' onClick={onFileData}>
        Close
      </ADButton> */}
      <ADTitle level={2}>Import Classroom</ADTitle>
      <input
        type='file'
        ref={fileInputRef}
        style={{
          display: 'none'
        }}
        id='input'
        onChange={getExcelFile}
      />
      <ADButton size='large' className='w-[168px] h-[40px] m-auto !mb-[20px] !mt-[20px]' onClick={() => fileInputRef.current.click()}>
        Upload Excel File
      </ADButton>
      <div className='py-4 text-dark text-lg'>Please select the classrooms you wish to import</div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        pagination={{
          defaultPageSize: 3,
          showSizeChanger: false
        }}
        dataSource={classData}
      />
      {classDataSubmit?.length > 0 && (
        <ADButton size='large' type='primary' onClick={submitClassData} className='w-1/3'>
          Submit
        </ADButton>
      )}
    </div>
  );
}
