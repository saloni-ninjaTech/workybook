import { Button, Typography } from 'antd';
import React from 'react';

import googleIcon from '../../assets/images/google-icon.png';
import cleverIcon from '../../assets/images/clever-icon.png';
import ADButton from '../antd/ADButton';
import ADImage from '../antd/ADImage';

function MainContent({ setIsImport, setIsManual, setManualStep }) {
  return (
    <>
      <Typography.Title level={1} className='!text-2xl md:!text-2xl mt-[30px] text-center'>
        Create Classroom
      </Typography.Title>
      <Typography.Title level={5} className='!font-normal !mt-[16px] !mb-[76px] !text-[14px] text-center'>
        How would you like to create your
        <br />
        classroom
      </Typography.Title>
      <div className='flex flex-col gap-[14px] pb-[37px]'>
        <ADButton className='w-[85%] max-w-[358px] h-[60px] m-auto' onClick={() => setIsImport(true)}>
          <ADImage src={googleIcon} alt='googleIcon' className='w-[24px] mr-[8px]' />
          Import from Google Classroom
        </ADButton>
        <ADButton className='w-[85%] max-w-[358px] h-[60px] m-auto' onClick={() => setIsImport(true)}>
          <ADImage src={cleverIcon} alt='cleverIcon' className='w-[24px] mr-[8px]' />
          Import from Clever
        </ADButton>
        <ADButton className='w-[85%] max-w-[358px] h-[60px] m-auto' onClick={() => setIsImport(true)}>
          Import an excel file
        </ADButton>
        <ADButton
          className='w-[85%] max-w-[358px] h-[60px] m-auto'
          onClick={() => {
            setManualStep(1);
            setIsManual(true);
          }}
        >
          Create Manually
        </ADButton>
      </div>
    </>
  );
}

export default MainContent;
