import React from 'react';
import { Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import ADImage from '../antd/ADImage';

function SubjectComponent({ subjectImage, subjectName, subjectId }) {
  const { sid } = useParams();
  return (
    <Link to={`/explore/subject/${subjectId}`} className='mr-7 sm:mr-10 md:mr-12 lg:mr-14 xl:mr-16'>
      <Typography.Text className={`flex flex-col items-center justify-items-center gap-[10px] ${parseInt(sid, 30) === parseInt(subjectId, 30) ? 'activeSubject' : ''}`}>
        <ADImage src={subjectImage} alt='subjectImage' height='75px' className='w-[75px] rounded-full' />
        <p className='text-medium text-[14px]'>{subjectName}</p>
      </Typography.Text>
    </Link>
  );
}

export default SubjectComponent;
