import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Form, Upload, message, Avatar, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import ADButton from '../../components/antd/ADButton';
import ADInput from '../../components/antd/ADInput';
import ADTitle from '../../components/antd/ADTitle';
import { getProfile, updateProfile } from '../../app/features/user/userSlice';
import getBase64 from '../../utils/getBase64';

const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
const API_URL = process.env.REACT_APP_API_URL;

function UserProfile() {
  const { user } = useSelector((state) => state.auth);
  const [userPassword, setUserPassword] = useState('abcdefghijkl');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getProfile({
        id: user?.payload?._id
      })
    );
  }, [user?.user]);

  const [fileList, setFileList] = useState([{
    uid: -1, status: 'done', url: `${IMAGE_URL}/${userData?.user?.avatar}`
  }]);
  useEffect(() => {
    form.setFieldsValue({
      salutation: userData?.user?.salutation || '',
      firstName: userData?.user?.firstName || '',
      lastName: userData?.user?.lastName || '',
      email: userData?.user?.email || '',
      // password: userData?.user?.password || '',
      schoolName: userData?.user?.schoolName || '',
      state: userData?.user?.state || '',
      city: userData?.user?.city || '',
      avtarImage: userData?.user?.avatar
    });
  }, [userData]);

  const check = (values) => {
    const { city, firstName, lastName, password, salutation, schoolName, state, avtarImage } = values;
    return (
      password === undefined && userData.user.avatar === avtarImage && userData.user.city === city && userData.user.firstName === firstName && userData.user.lastName === lastName && userData.user.salutation === salutation && userData.user.schoolName === schoolName && userData.user.state === state
    );
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isPNG = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg';
      if (!isPNG) {
        message.error(`${file.name} is not a image file`);
        return true;
      }
      return isPNG;
    }
  };
  const onFinish = (values) => {
    if (!check(values)) {
      const userInfo = {
        id: user?.payload?._id,
        userDetail: {
          salutation: values.salutation,
          firstName: values.firstName,
          lastName: values.lastName,
          schoolName: values.schoolName,
          city: values.city,
          state: values.state,
          newPassword: values.password,
          avatar: values.avtarImage
        }
      };
      if (userInfo) dispatch(updateProfile(userInfo));
      navigate('/');
    } else {
      toast.info('No Changes made');
    }
  };
  const onFinishFailed = () => {
    toast.error('Something Wrong!');
  };

  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // Extra
  const handleChange = ({ fileList: newFileList }) => {
    form.setFieldsValue({
      avtarImage: newFileList[0]?.response?.url
    });
    setFileList(newFileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleCancel = () => setPreviewOpen(false);

  return (
    <MainLayout>
      <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-3xl font-bold leading-6'>Edit Profile</h3>
        </div>
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img
            alt='example'
            style={{
              width: '100%'
            }}
            src={previewImage}
          />
        </Modal>
        <Form onFinish={onFinish} form={form} onFinishFailed={onFinishFailed}>
          <div className='px-6'>
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
                xl: 40,
                xxl: 48
              }}
            >
              <Col span={12}>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                    xl: 40,
                    xxl: 48
                  }}
                  className='pb-10'
                >
                  <Col span={8}>
                    <div className='text-lg text-gray-500'>Profile Picture</div>
                  </Col>
                  <Col span={16}>
                    <div className='flex items-center'>
                      <Form.Item
                        name='image'
                        rules={[
                          {
                            required: true,
                            message: 'Please upload your profile image!'
                          }]}
                        getValueFromEvent={getFile}
                        valuePropName='avatar'
                        initialValue={fileList}
                      >
                        <Upload
                          action={`${API_URL}/user/uploadImage`}
                          listType='picture-card'
                          fileList={fileList}
                          accept='image/*'
                          {...uploadProps}
                          onChange={handleChange}
                          onPreview={handlePreview}
                        >
                          {fileList.length >= 1 ? null : <Avatar size={64} icon={<UserOutlined />} />}
                        </Upload>
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                    xl: 40,
                    xxl: 48
                  }}
                  className='pb-8'
                >
                  <Col span={8}>
                    <div className='text-lg font-medium text-gray-500'>Contact Information</div>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={false} name='salutation'>
                      <ADInput placeholder='Salutation' value={userData?.user?.salutation} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                    xl: 40,
                    xxl: 48
                  }}
                  className='pb-8'
                >
                  <Col offset={8} span={16}>
                    <Row
                      gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,
                        xl: 40,
                        xxl: 48
                      }}
                    >
                      <Col span={12}>
                        <Form.Item
                          label={false}
                          name='firstName'
                          rules={[
                            {
                              required: true,
                              message: 'Please input your First Name!'
                            }]}
                        >
                          <ADInput placeholder='First Name' />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label={false}
                          name='lastName'
                          rules={[
                            {
                              required: true,
                              message: 'Please input your Last Name!'
                            }]}
                        >
                          <ADInput placeholder='Last Name' />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                    xl: 40,
                    xxl: 48
                  }}
                  className='pb-8'
                >
                  <Col offset={8} span={16}>
                    <Form.Item
                      label={false}
                      name='email'
                      rules={[
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!'
                        },
                        {
                          required: true,
                          message: 'Please input your E-mail!'
                        }]}
                    >
                      <ADInput placeholder='Email' value={userData?.user?.email} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                    xl: 40,
                    xxl: 48
                  }}
                  className='pb-8'
                >
                  <Col span={8} className='text-lg font-medium text-gray-500'>
                    Password
                  </Col>
                  <Col span={16}>
                    <Row
                      gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,
                        xl: 40,
                        xxl: 48
                      }}
                    >
                      <Col span={12}>
                        <Form.Item label={false} name='password'>
                          <ADInput type='text' disabled={userData?.user?.type === 4} onChange={(e) => setUserPassword(e.target.value)} />
                        </Form.Item>
                        <Form.Item label={false} name='avtarImage' hidden={true}>
                          <ADInput type='text' />
                        </Form.Item>
                        {/* <Form.Item label={false} name='avtarImge'>
                          <ADInput placeholder='School Name' value='ffsdfsdf' />
                        </Form.Item> */}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                    xl: 40,
                    xxl: 48
                  }}
                  className='pb-8'
                >
                  <Col span={8} className='text-lg font-medium text-gray-500'>
                    Your School
                  </Col>
                  <Col span={16}>
                    <Form.Item label={false} name='schoolName'>
                      <ADInput placeholder='School Name' value={userData?.user?.schoolName} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                    xl: 40,
                    xxl: 48
                  }}
                  className='pb-16'
                >
                  <Col offset={8} span={16}>
                    <Row
                      gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,
                        xl: 40,
                        xxl: 48
                      }}
                    >
                      <Col span={12}>
                        <Form.Item label={false} name='state'>
                          <ADInput placeholder='State' value={userData?.user?.state} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label={false} name='city'>
                          <ADInput placeholder='City' value={userData?.user?.city} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                    xl: 40,
                    xxl: 48
                  }}
                  className='pb-8'
                >
                  <Col offset={8} span={16}>
                    <Row
                      gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,
                        xl: 40,
                        xxl: 48
                      }}
                      className='pb-8'
                    >
                      <Col span={12}>
                        <Form.Item>
                          <ADButton type='primary' htmlType='submit' className='w-full'>
                            Submit
                          </ADButton>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </MainLayout>
  );
}

export default UserProfile;
