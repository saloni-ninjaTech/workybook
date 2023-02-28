import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ADModal from '../antd/ADModal';
import ADSteps from '../antd/ADSteps';
import ADButton from '../antd/ADButton';
import { logout, reset } from '../../app/features/auth/authSlice';

function ExporedGoogleToken({ onOk, ...props }) {
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  return (
    <ADModal centered footer={false} onOk={onOk} {...props}>
      <div className='flex flex-col items-center justify-center'>
        <div className='steps-content'>
          <div className='py-4 text-dark text-lg text-center'>your session is expried so you can relogin your accout with google.</div>

          <ADButton
            size='large'
            block
            onClick={() => {
              onOk();
              dispatch(logout());
              dispatch(reset());
              nevigate('/sign-in');
            }}
          >
            ok
          </ADButton>

        </div>
      </div>
    </ADModal>
  );
}

export default ExporedGoogleToken;
