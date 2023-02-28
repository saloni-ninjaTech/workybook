import React from 'react';
import { useSelector } from 'react-redux';
import ADButton from '../antd/ADButton';
import ADTitle from '../antd/ADTitle';
import Spinner from '../spinner/Spinner';

export default function StudentsAdded({ onClose }) {
  const { currentClass, isLoading: classLoading, importClassCsvResponse } = useSelector((state) => state.classroom);
  const { newStudents, isLoading: studentsLoading } = useSelector((state) => state.students);
  return (
    <div className='flex flex-col items-center'>
      <ADTitle level={2}>Students Added</ADTitle>
      {/* <div className='py-4 text-dark text-lg my-16 text-center'>students has been added to Workybooks</div> */}
      {newStudents?.student ? (
        <div className='py-4 text-dark text-lg my-16 text-center'>{!newStudents || (classLoading && studentsLoading) ? <Spinner /> : `( ${newStudents?.student?.students} ) ${newStudents?.student?.students === 1 ? ' student' : 'students'}  has been added to Workybooks`}</div>
      ) : (
        <div className='py-4 text-dark text-lg my-16 text-center'>{!newStudents ? <Spinner /> : `( ${newStudents?.importedCount} ) ${newStudents?.importedCount === 1 ? ' student' : 'students'}  has been added to Workybooks`}</div>
      )}
      <ADButton size='large' type='primary' className='w-1/3' onClick={onClose}>
        Close
      </ADButton>
    </div>
  );
}
