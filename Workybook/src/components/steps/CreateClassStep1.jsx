import React, { useState } from 'react';
import { Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ADButton from '../antd/ADButton';
import ADTitle from '../antd/ADTitle';

export default function CreateClassStep1({ onGoogleClick, onCleverClick, onExcelClick, onManualClick }) {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className='flex flex-col items-center'>
      <ADTitle level={2}>Create Classroom</ADTitle>
      <div className='py-4 text-dark text-lg text-center'>How would you like to create your classroom</div>
      <Space className='py-8' size='middle' direction='vertical'>
        {user?.payload?.type === 4 && (
        <ADButton size='large' block onClick={onGoogleClick}>
          Import from Google classroom
        </ADButton>
        )}

        <ADButton size='large' block onClick={onCleverClick}>
          Import from Clever
        </ADButton>
        <ADButton size='large' block onClick={onExcelClick}>
          Import an Excel file
        </ADButton>
        <ADButton size='large' block onClick={onManualClick}>
          Create manually
        </ADButton>
      </Space>
    </div>
  );
}
