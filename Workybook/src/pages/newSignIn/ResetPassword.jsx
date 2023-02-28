import React, { useEffect } from 'react';
import { Form, Input, Layout, Typography } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset, resetPassword } from '../../app/features/auth/authSlice';
import logo from '../../assets/images/logo.png';
import Spinner from '../../components/spinner/Spinner';
import ADButton from '../../components/antd/ADButton';
import ADImage from '../../components/antd/ADImage';

function ResetPassword() {
  window.document.title = 'Workybook - Reset Password';
  const { Header } = Layout;
  const { id } = useParams();
  const [form] = Form.useForm();
  const { Paragraph } = Typography;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    } else if (user) {
      navigate('/sign-in', {
        replace: true
      });
    }

    dispatch(reset());
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading) {
    <Spinner />;
  }

  const onFinish = (values) => {
    const data = {
      id,
      pass: values
    };
    dispatch(resetPassword(data));
    dispatch(logout())
      .unwrap()
      .then(() => navigate('/sign-in'));
  };

  const onFinishFailed = () => {
    toast.error('Something Wrong!, Not able to login!');
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
      <div className='w-[85%] max-w-[554px] h-[688px] bg-white-100 rounded-[20px] m-auto shadow flex flex-col text-center'>
        <Typography.Title level={2} className='mt-[56px] !mb-[65px]'>
          Reset Password
        </Typography.Title>

        <Form onFinish={onFinish} form={form} onFinishFailed={onFinishFailed}>
          <Form.Item
            label={false}
            name='newPassword'
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Not Strong Enough'
              },
              {
                min: 6, message: 'Password must be minimum 6 characters.'
              }
            ]}
          >
            <Input.Password placeholder='New Password' className='w-[85%] max-w-[358px] h-[46px] m-auto rounded-[6px]' />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <ADButton type='primary' htmlType='submit' className='w-[85%] max-w-[358px] m-auto' disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length > 0}>
                Submit
              </ADButton>
            )}
          </Form.Item>
        </Form>
      </div>
      <Paragraph className='m-auto block w-[85%] max-w-[554px] text-center mt-[20px] mb-[40px]'>
        Don’t have an account?
        <Link to='/sign-up' className='ml-[5px]'>
          Sign up
        </Link>
      </Paragraph>
      <Typography.Title level={5} className='mx-auto my-[20px] text-center font-medium'>
        <span className='font-medium'>Student?&nbsp;</span>
        <Link to='/' className='ml-[5px]'>
          Go here
        </Link>
      </Typography.Title>
      <br />
    </>
  );
}
export default ResetPassword;
