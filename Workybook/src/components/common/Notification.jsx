import React, { useEffect } from 'react';
import { Avatar, List } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getNotification } from '../../app/features/notification/notificationSlice';

function Notification() {
  const dispatch = useDispatch();
  const { notification, isLoading } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(getNotification());
  }, []);

  return (
    <List
      itemLayout='horizontal'
      dataSource={notification}
      style={{
        position: 'absolute', width: '30%', zIndex: '999', right: '10%', top: '55px', background: '#f9fafb'
      }}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            className='p-3'
            title={item?.assignment?.title}
            description={`${item?.student?.fullName} has been submmited ${item?.assignment?.title} on ${moment(item?.submittedAssignment?.submittedDate).format('MM/DD/YYYY')} at ${moment(item?.submittedAssignment?.submittedDate).format('hh:mm a')}`}
          />
        </List.Item>
      )}
    />
  );
}
export default Notification;
