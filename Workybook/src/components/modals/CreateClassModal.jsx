import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ADModal from '../antd/ADModal';
import ADSteps from '../antd/ADSteps';
import CreateClassAddStudents from '../steps/createClass/CreateClassAddStudents';
import CreateClassManually from '../steps/createClass/CreateClassManually';
import ManualClassCreated from '../steps/createClass/ManualClassCreated';
import CreateClassStep1 from '../steps/CreateClassStep1';
import ImportClass from '../steps/createClass/ImportClass';
import ImportClassesCreated from '../steps/createClass/ImportClassesCreated';
import GetCsvData from '../steps/importClassRoomExcelFile/GetCsvData';
import ListAndSaveData from '../steps/importClassRoomExcelFile/ListAndSaveData';
import { getGoogleClassRoomData } from '../../app/features/classroom/classroomSlice';
import ExpiredGoogleToken from './ExpiredGoogleToken';

function CreateClassModal({ onOk, ...props }) {
  const [current, setCurrent] = useState(0);
  const [shoModel, setShowModel] = useState(false);
  const [showAddStudents, setShowAddStudents] = useState(false);
  const dispatch = useDispatch();
  const next = () => setCurrent(current + 1);
  const getClassRoomdataAPI = () => {
    dispatch(getGoogleClassRoomData({
    })).then((res) => {
      // onOk();
      // setShowAddStudents(true);
      if (res?.error) {
        onOk();
        setShowAddStudents(true);
        // toast.error(error);
      } else {
        setCurrent(4);
      }
    });
  };
  const items = [
    {
      title: 'create class', // 0
      content: <CreateClassStep1 onGoogleClick={() => getClassRoomdataAPI()} onManualClick={next} onExcelClick={() => { setCurrent(6); }} />
    },
    {
      title: 'create manual', // 1
      content: <CreateClassManually next={next} handleCreateClassOk={props.handleCreateClassOk} />
    },
    {
      title: 'add students', // 2
      content: <CreateClassAddStudents next={next} />
    },
    {
      title: 'class created', // 3
      content: <ManualClassCreated onOk={onOk} />
    },
    {
      title: 'import class', // 4
      content: <ImportClass next={next} />
    },
    {
      title: 'classes created', // 5
      content: <ImportClassesCreated onOk={onOk} />
    },
    {
      title: 'classes created', // 5
      content: <GetCsvData onFileData={() => { setCurrent(7); }} />
    },
    {
      title: 'classes created', // 5
      content: <ListAndSaveData onOk={onOk} />
    }
  ];

  return (
    <>
      <ExpiredGoogleToken
        closable={false}
        open={showAddStudents}
        onOk={() => {
          setShowAddStudents(false);
          // setCurrent(1);
        }}
        onCancel={() => {
          setShowAddStudents(false);
        //  setCurrent(1);
        }}
      />
      <ADModal centered footer={false} onOk={onOk} afterClose={() => setCurrent(0)} {...props}>
        <ADSteps items={items} current={1} />
        <div className='flex flex-col items-center justify-center'>
          <div className='steps-content'>{items[current].content}</div>
        </div>
      </ADModal>
    </>
  );
}

export default CreateClassModal;
