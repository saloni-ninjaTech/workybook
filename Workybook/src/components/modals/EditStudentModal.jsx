import React, { useEffect, useState } from 'react';
import { Avatar, Col, Form, Input, Modal, Row, Space, Upload } from 'antd';
import { FaPencilAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-toastify';
import ADModal from '../antd/ADModal';
import ADTitle from '../antd/ADTitle';
import ADButton from '../antd/ADButton';
import { deleteStudent, editStudent, getStudents } from '../../app/features/students/studentsSlice';
import getBase64 from '../../utils/getBase64';

const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
const API_URL = process.env.REACT_APP_API_URL;
export default function EditStudentModal({ onShow, onOk, onCancel, ...props }) {
  const { currentClass } = useSelector((state) => state.classroom);
  const { currentStudent } = useSelector((state) => state.students);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const dispatch = useDispatch();
  const [form] = useForm();
  const [fileList, setFileList] = useState([{
    uid: -1, status: 'done', url: `${IMAGE_URL}/${currentStudent?.avatar}`
  }]);

  const handleChange = ({ fileList: newFileList }) => {
    form.setFieldsValue({
      avtarImage: newFileList[0]?.response?.url
    });
    setFileList(newFileList);
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

  useEffect(() => {
    form.setFieldsValue({
      nickName: currentStudent?.nickName,
      firstName: currentStudent?.firstName,
      lastName: currentStudent?.lastName,
      userName: currentStudent?.userName,
      password: currentStudent?.showPassword,
      parentEmail: currentStudent?.parentEmail,
      avtarImage: currentStudent?.avatar
    });
    setFileList([{
      uid: -1, status: 'done', url: `${IMAGE_URL}/${currentStudent?.avatar}`
    }]);
  }, [currentStudent]);

  const onDeleteHandler = async () => {
    await dispatch(deleteStudent(currentStudent?._id));
    await dispatch(getStudents(currentClass?._id));
    onCancel();
  };

  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleCancel = () => setPreviewOpen(false);

  const onFinish = async (values) => {
    delete values.image;
    values.avatar = values.avtarImage;
    delete values.avtarImage;
    const data = {
      id: currentStudent?._id,
      ...values
    };
    // await dispatch(editStudent(data)).then(async (res) => {
    //   if (res.error) {
    //     toast.error(res.payload.data.message);
    //   } else {
    //     await dispatch(getStudents(currentClass?._id));
    //     onOk();
    //   }
    // });
    await dispatch(editStudent(data));
    await dispatch(getStudents(currentClass?._id));
    onOk();
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  return (
    <ADModal forceRender centered footer={false} onCancel={onCancel} {...props}>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt='example'
          style={{
            width: '100%'
          }}
          src={previewImage}
        />
      </Modal>
      <ADTitle level={2} className='text-center'>
        Edit Student
      </ADTitle>
      <div className='py-4 text-dark text-lg text-center mb-6'>Update student details</div>
      <Form name='edit-student' form={form} onFinish={onFinish}>
        <Row gutter={[16, 0]} className='mb-2'>
          <Col xs={24} sm={12}>
            <Form.Item
              name='image'
              rules={[
                {
                  required: true,
                  message: 'Please upload your profile image!'
                }]}
              initialValue={fileList}
              getValueFromEvent={getFile}
              valuePropName='avatar'
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
          </Col>
          <Col xs={24} sm={12} className='flex items-end'>
            <Form.Item name='nickName' className='w-full'>
              <Input size='large' placeholder='Nickname' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className='pb-0 mb-2'>
          <Col xs={24} sm={12}>
            <Form.Item
              name='firstName'
              className='w-full'
              rules={[
                {
                  required: true,
                  message: 'Please input your first name'
                }
              ]}
            >
              <Input size='large' placeholder='First Name' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} className='flex items-center'>
            <Form.Item
              name='lastName'
              className='w-full'
              rules={[
                {
                  required: true,
                  message: 'Please input your last name'
                }
              ]}
            >
              <Input size='large' placeholder='Last Name' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className='pb-0 mb-2'>
          <Col xs={24} sm={12} className='flex items-center'>
            <Form.Item
              name='userName'
              className='w-full'
              rules={[
                {
                  required: true,
                  message: 'Please input your username'
                }
              ]}
            >
              <Input size='large' placeholder='Username' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} className='flex items-center'>
            <Form.Item
              name='password'
              className='w-full'
              rules={[
                {
                  required: true,
                  message: 'Please input your Password'
                }
              ]}
            >
              <Input
                size='large'
                placeholder='Password'
              />
            </Form.Item>
            <Form.Item label={false} name='avtarImage' hidden={true}>
              <Input type='text' />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name='parentEmail' className='mb-8'>
          <Input size='large' className='mb-2' placeholder='Parent Email' />
        </Form.Item>
        <Row gutter={16} className='pb-0'>
          <Col xs={24} sm={12}>
            <ADButton danger block onClick={onDeleteHandler}>
              DELETE
            </ADButton>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item>
              <ADButton block htmlType='submit' type='primary'>
                SAVE
              </ADButton>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ADModal>
  );
}
