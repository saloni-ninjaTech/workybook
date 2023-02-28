import React, { useRef } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ADButton from '../../antd/ADButton';
import ADTitle from '../../antd/ADTitle';
import { createStudents, getStudents, importStudentCsv } from '../../../app/features/students/studentsSlice';

export default function CreateClassAddStudents({ next }) {
  const { isSuccess } = useSelector((state) => state.students);
  const fileInputRef = useRef();
  const { currentClass, currentCreateClass } = useSelector((state) => state.classroom);
  const dispatch = useDispatch();
  const uplaodCsv = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('classId', currentClass._id);
    await dispatch(importStudentCsv(formData));
    if (await isSuccess) {
      await next();
      await dispatch(getStudents(currentClass._id));
    }
  };
  const onFinish = async (values) => {
    if (values.students) {
      const data = {
        classroom: currentClass._id,
        ...values
      };
      await dispatch(createStudents(data));
      await dispatch(getStudents(currentClass._id));
      if (await isSuccess) {
        await next();
      }
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <ADTitle level={2}>Add Students</ADTitle>
      <div className='py-4 text-dark text-lg text-center'>Please provide the classroom details</div>
      <input
        type='file'
        ref={fileInputRef}
        style={{
          display: 'none'
        }}
        id='input'
        onChange={uplaodCsv}
      />
      {/* <ADButton size='large' className='w-[168px] h-[40px] m-auto !mb-[20px] !mt-[20px]' onClick={() => fileInputRef.current.click()}>
        Upload Excel File
      </ADButton> */}
      <ADButton size='large' onClick={() => fileInputRef.current.click()}>Import</ADButton>
      <div className='pt-4 text-dark text-xl text-center'>Or, enter student names manually.</div>
      <div className='py-4 text-dark text-xs text-center'>Please enter student names as First name Last Name - one per line.</div>
      <Form name='dynamic_form_nest_item' onFinish={onFinish} autoComplete='off' className='border border-solid border-success rounded-2xl pt-6 w-full flex flex-col items-center'>
        <Form.List name='students'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                    marginBottom: 8
                  }}
                  align='baseline'
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'firstName']}
                    rules={[
                      {
                        required: true,
                        message: 'Missing first name'
                      }
                    ]}
                  >
                    <Input autoFocus placeholder='First Name' />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'lastName']}
                    rules={[
                      {
                        required: true,
                        message: 'Missing last name'
                      }
                    ]}
                  >
                    <Input placeholder='Last Name' />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item className='w-11/12'>
                <ADButton className='w-full' type='dashed' onClick={() => add()} icon={<PlusOutlined />}>
                  Add Student
                </ADButton>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item className='flex justify-center'>
          <ADButton size='large' className='min-w-[140px]' type='primary' htmlType='submit'>
            ADD
          </ADButton>
        </Form.Item>
      </Form>
    </div>
  );
}
