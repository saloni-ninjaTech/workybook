import React, { useEffect } from 'react';
import { Layout, Typography } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/images/logo.png';
import { verifyEmail } from '../../app/features/auth/authSlice';
import Spinner from '../../components/spinner/Spinner';
import ADTitle from '../../components/antd/ADTitle';
import ADImage from '../../components/antd/ADImage';

export default function VerifyEmail() {
  const { Header } = Layout;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyEmail(id))
      .unwrap()
      .then(() => navigate('/welcome'));
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Header className='h-20 relative container mx-auto'>
            <div className='flex items-center justify-between pt-2'>
              <div>
                <Link to='/'>
                  <ADImage
                    src={logo}
                    alt='logo'
                    style={{
                      width: 100
                    }}
                  />
                </Link>
              </div>
            </div>
          </Header>
          <div className='mt-10 pt-10 w-[85%] max-w-[554px] h-[688px] bg-white-100 rounded-[20px] m-auto shadow flex flex-col text-center'>
            <Typography.Title level={2} className='mt-[56px] !mb-[65px]'>
              Verify Email
            </Typography.Title>
            {isError && (
              <ADTitle level={4}>
                Your email is already verified. Please visit Dashboard
                <Link to='/'>{' here'}</Link>
              </ADTitle>
            )}
            <Typography.Title level={5} className='mx-auto my-[20px] text-center font-medium pt-20'>
              <span className='font-medium'>Student?&nbsp;</span>
              <Link to='/' className='ml-[5px]'>
                Go here
              </Link>
            </Typography.Title>
            <div className='m-auto block w-[85%] max-w-[554px] text-center mt-[20px] mb-[40px]'>
              Don’t have an account?
              <Link to='/sign-up' className='ml-[5px]'>
                Sign up
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
