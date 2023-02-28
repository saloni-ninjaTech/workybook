import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import ADButton from '../../antd/ADButton';
import ADTitle from '../../antd/ADTitle';
import { editClass, getClassroom, getClassrooms } from '../../../app/features/classroom/classroomSlice';

export default function EditClass({ next }) {
  const { currentClass } = useSelector((state) => state.classroom);
  const { grades, isLoading } = useSelector((state) => state.grades);
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();
  const [form] = useForm();

  const onFinish = async (values) => {
    const data = {
      classId: currentClass?._id,
      values
    };
    await dispatch(editClass(data));
    await dispatch(getClassroom(currentClass?._id));
    await dispatch(getClassrooms());
    next();
  };

  useEffect(() => {
    form.setFieldsValue({
      name: currentClass?.name,
      grade: currentClass?.grade?._id
    });
  }, [currentClass]);

  return (
    <div className='flex flex-col items-center'>
      <ADTitle level={2}>Edit Classroom</ADTitle>
      <div className='py-4 text-dark text-lg text-center'>Please provide the classroom details</div>
      <Form name='add-class-manually' form={form} onFinish={onFinish}>
        <Form.Item
          name='name'
          rules={[
            {
              required: true,
              message: 'Please input your class name!'
            }
          ]}
        >
          <Input placeholder='Class Name' />
        </Form.Item>
        <div className='py-4 text-dark text-lg text-center'>Grade Level</div>
        <Form.Item
          name='grade'
          rules={[
            {
              required: true,
              message: 'Please pick a grade!'
            }
          ]}
        >
          <Radio.Group buttonStyle='solid' onChange={(e) => setValue(e.target.value)} value={value}>
            <Space wrap className='flex justify-center py-6'>
              {grades?.list?.length &&
                grades?.list?.map((grade) => (
                  <Radio.Button key={grade._id} value={grade._id} className='flex items-center whitespace-nowrap justify-center w-16 py-1 !rounded-full border border-success border-solid bg-success'>
                    {grade.title}
                  </Radio.Button>
                ))}
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item className='flex justify-center'>
          <ADButton size='large' type='primary' htmlType='submit' disabled={isLoading}>
            CONTINUE
          </ADButton>
        </Form.Item>
      </Form>
    </div>
  );
}
