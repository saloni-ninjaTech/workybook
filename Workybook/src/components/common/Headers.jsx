/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState, useEffect } from 'react';
import { BellFilled, DownOutlined, EditOutlined, LogoutOutlined, MenuOutlined, QuestionCircleFilled } from '@ant-design/icons';
import { Dropdown, Layout, Menu, Space, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { logout, reset } from '../../app/features/auth/authSlice';
import { getProfile } from '../../app/features/user/userSlice';
import logo from '../../assets/images/logo.png';
import ADButton from '../antd/ADButton';
import ADImage from '../antd/ADImage';
import Notification from './Notification';

const { Header } = Layout;
const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
function Headers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navbarRef = useRef(null);
  const hamburgerRef = useRef(null);
  const [showMobileNavbar, setShowMobileNavbar] = useState(false);
  const [Notify, setNotify] = useState(false);
  const userLocalData = localStorage.getItem('user');
  const { userData } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const handleToggleNavbar = () => {
    setShowMobileNavbar(!showMobileNavbar);
    // navbarRef.current.classList.toggle('flex');
    // navbarRef.current.classList.toggle('hidden');
    // hamburgerRef.current.classList.toggle('open');
  };
  useEffect(() => {
    dispatch(
      getProfile({
        id: user?.payload?._id
      })
    );
  }, [user?.user]);
  const items = [
    {
      label: 'Edit Profile',
      key: '1',
      icon: <EditOutlined className='text-base text-gray-400' />,
      onClick: () => {
        navigate('/user-profile');
      }
    },
    {
      label: 'Logout',
      key: '2',
      icon: <LogoutOutlined className='text-base text-gray-400' />,
      onClick: () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/sign-in');
      }
    }
  ];

  return (
    <>
      <Header className='h-20 flex justify-between items-center bg-white xl:px-10 lg:px-8 md:px-6 px-0'>
        <Link to='/'>
          <ADImage
            src={logo}
            alt='logo'
            style={{
              width: 100
            }}
          />
        </Link>

        {/* navbar menu */}
        {userLocalData && (
        <div className='hidden space-x-4 md:flex'>
          <Link to='/explore' className='hover:text-[#243E8F]'>
            <span className={`navbar-menu-item ${window.location.pathname === '/' || window.location.pathname.includes('/explore') ? 'active-menu' : ''}`}>Explore</span>
          </Link>
          <Link to='/my-library'>
            <span className={`navbar-menu-item ${window.location.pathname.includes('/my-library') ? 'active-menu' : ''}`}>My Library</span>
          </Link>
          <Link to='/my-classrooms'>
            <span className={`navbar-menu-item ${window.location.pathname.includes('/my-classrooms') ? 'active-menu' : ''}`}>My Classrooms</span>
          </Link>
        </div>
        )}

        {/* login/register button */}
        {!userLocalData ? (
          <Space size='large'>
            <ADButton onClick={() => navigate('/sign-in')} type='primary' className='w-[100px]'>
              Sign In
            </ADButton>
            <ADButton onClick={() => navigate('/sign-up')} type='primary' className='w-[100px]'>
              Sign Up
            </ADButton>
          </Space>
        ) : (
          <Space>

            <BellFilled onClick={() => setNotify(!Notify)} className='text-2xl text-gray-400 mr-5 mt-6' />

            <div className='flex'>
              {
              userData?.user?.avatar !== '' ? (
                <ADImage
                  src={`${IMAGE_URL}/${userData?.user?.avatar}`}
                  alt='logo'
                  className=''
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%'
                  }}
                />
              ) : <FaUserCircle className='text-4xl text-success' />
            }

            </div>
            <Dropdown
              menu={{
                items
              }}
            >
              <Space>
                <DownOutlined className='mr-5' />
              </Space>
            </Dropdown>
            <QuestionCircleFilled className='text-2xl text-gray-400 mt-6' />
          </Space>
        )}

        {/* hamburger icon */}
        {user && (
        <ADButton
          className='hamburger md:hidden focus:outline-none bg-white'
          style={{
            position: 'relative'
          }}
          onClick={handleToggleNavbar}
          innerRef={hamburgerRef}
          id='menu-btn'
        >
          <MenuOutlined />
            {/* mobile menu */}
            {showMobileNavbar && (
            <div
              style={{
                position: 'absolute', top: 35, right: 0, zIndex: 10, backgroundColor: '#fff', padding: 10, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
              }}
              onClick={() => setShowMobileNavbar(false)}
            >
              <Link to='/explore' className='hover:bg-primary rounded-md h-10 w-full hover:text-white flex items-center justify-center'>
                <span className='navbar-menu-item'>Explore</span>
              </Link>
              <Link to='/my-library' className='hover:bg-primary rounded-md h-10 w-full hover:text-white flex items-center justify-center'>
                <span className='navbar-menu-item'>My Library </span>
              </Link>
              <Link to='/my-classrooms' className='hover:bg-primary rounded-md h-10 w-full hover:text-white flex items-center justify-center'>
                <span className='navbar-menu-item'>My Classrooms</span>
              </Link>
            </div>
            )}
        </ADButton>
        )}

        {/* <div className='md:hidden z-10'>
          <div id='menu' ref={navbarRef} className='bg-white border border-solid border-primary absolute flex-col items-center hidden self-end font-bold mt-6 left-0 rounded-md border-t-0 right-0 sm:w-auto sm:self-center'>
            <Link to='/' className='hover:bg-primary rounded-md h-10 w-full hover:text-white flex items-center justify-center'>
              <span className='navbar-menu-item'>Explore</span>
            </Link>
            <Link to='/my-library' className='hover:bg-primary rounded-md h-10 w-full hover:text-white flex items-center justify-center'>
              <span className='navbar-menu-item'>My Library </span>
            </Link>
            <Link to='/my-classrooms' className='hover:bg-primary rounded-md h-10 w-full hover:text-white flex items-center justify-center'>
              <span className='navbar-menu-item'>My Classrooms</span>
            </Link>
          </div>
        </div> */}
      </Header>
      {Notify ? <Notification /> : ''}
    </>
  );
}

export default Headers;
