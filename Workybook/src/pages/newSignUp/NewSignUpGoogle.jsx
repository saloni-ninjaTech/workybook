import { Button, Col, Form, Input, Layout, Row, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { googleRegister, reset } from '../../app/features/auth/authSlice';
import logo from '../../assets/images/logo.png';
import ADButton from '../../components/antd/ADButton';
import ADImage from '../../components/antd/ADImage';
import Spinner from '../../components/spinner/Spinner';

function NewSignUpGoogle() {
  window.document.title = 'Workybook - Sign Up';
  const { Header } = Layout;
  const { isLoading, isSuccess, isError, message, isGoogle } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (user) {
      navigate('/welcome', {
        replace: true
      });
    }
    dispatch(reset());
  }, [user, isError]);

  if (isLoading) {
    <Spinner />;
  }
  useEffect(() => {
    form.setFieldsValue({
      firstName: location?.state?.firstName || 'ttt',
      lastName: location?.state?.lastName || 'ttt',
      email: location?.state?.email || 'ttt'
    });
  }, [location]);
  const onFinish = (values) => {
    dispatch(googleRegister(values));
  };

  const onFinishFailed = () => {
    toast.error('Something Wrong!, Not able to Register your account!');
  };
  return (
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
      <div className='w-[85%] max-w-[554px] min-h-[622px] bg-white-100 rounded-[20px] m-auto shadow flex flex-col text-center'>
        <Typography.Title level={2} className='!text-base md:!text-2xl mt-[56px]'>
          Welcome
          {' '}
          {`${location?.state?.firstName} ${location?.state?.lastName}`}
        </Typography.Title>
        <Typography.Title level={5} className='!font-normal !mt-[0px] !mb-[65px] !text-[14px]'>
          Please confirm your details
        </Typography.Title>
        <Form onFinish={onFinish} form={form} onFinishFailed={onFinishFailed}>
          <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>
            <Col span={12} className='!pl-[0px]'>
              <Form.Item
                label={false}
                name='firstName'
                rules={[
                  {
                    type: 'text'
                  },
                  {
                    required: true,
                    message: 'Please input your last name!'
                  }
                ]}
                value={location?.state?.firstName}
              >
                <Input
                  placeholder='First Name'
                  className='w-full h-[46px] m-auto rounded-[6px]'
                />
              </Form.Item>
            </Col>
            <Col span={12} className='!pr-0'>
              <Form.Item
                label={false}
                name='lastName'
                rules={[
                  {
                    type: 'text'
                  },
                  {
                    required: true,
                    message: 'Please input your last name!'
                  }
                ]}
                value={location?.state?.lastName}
              >
                <Input
                  placeholder='Last Name'
                  className='w-full h-[46px] m-auto rounded-[6px]'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>
            <Col span={24} className='!pr-0 !pl-0'>
              <Form.Item
                label={false}
                name='email'
                value={location?.state?.email}
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!'
                  }
                ]}
              >
                <Input
                  placeholder='Email'
                  className='w-full h-[46px] m-auto rounded-[6px]'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>
            <Typography.Title level={5} className='!font-medium'>
              Your School
            </Typography.Title>
          </Row>
          <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>
            <Col span={24} className='!pr-0 !pl-0'>
              <Form.Item
                label={false}
                name='schoolName'
                rules={[
                  {
                    type: 'text'
                  },
                  {
                    required: true,
                    message: 'Please input your School Name!'
                  }
                ]}
              >
                <Input placeholder='School Name' className='w-full h-[46px] m-auto rounded-[6px]' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>
            <Col span={12} className='!pl-[0px]'>
              <Form.Item
                label={false}
                name='state'
                rules={[
                  {
                    type: 'text'
                  },
                  {
                    required: true,
                    message: 'Please input your State Name!'
                  }
                ]}
              >
                <Input placeholder='State' className='w-full h-[46px] m-auto rounded-[6px]' />
              </Form.Item>
            </Col>
            <Col span={12} className='!pr-0'>
              <Form.Item
                label={false}
                name='city'
                rules={[
                  {
                    type: 'text'
                  },
                  {
                    required: true,
                    message: 'Please input your City Name!'
                  }
                ]}
              >
                <Input placeholder='City' className='w-full h-[46px] m-auto rounded-[6px]' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>

            <ADButton type='primary' htmlType='submit' className='w-full'>
              CONFIRM
            </ADButton>
          </Row>
        </Form>
      </div>
    </>
  );
}
export default NewSignUpGoogle;
