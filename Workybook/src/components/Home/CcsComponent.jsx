import React from 'react';
import { Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import ADImage from '../antd/ADImage';

function SubjectComponent({ ccsImage, ccsName, ccsId }) {
  const { id } = useParams();
  return (
    <Link to={`/ccs/${ccsId}`} className='mr-7 sm:mr-10 md:mr-12 lg:mr-14 xl:mr-16'>
      <Typography.Text className={`flex flex-col items-center justify-items-center gap-[10px] ${parseInt(id, 30) === parseInt(ccsId, 30) ? 'activeSubject' : ''}`}>
        <ADImage src={ccsImage} alt='ccsImage' height='75px' className='w-[75px] rounded-full' />
        <p className='text-medium text-[14px]'>{ccsName}</p>
      </Typography.Text>
    </Link>
  );
}

export default SubjectComponent;
