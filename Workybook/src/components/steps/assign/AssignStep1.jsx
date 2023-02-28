/* eslint-disable no-return-assign */
import { Row, Col, Empty } from 'antd';
import { BsDashCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ADTitle from '../../antd/ADTitle';
import ADImage from '../../antd/ADImage';
import dummyImage from '../../../assets/images/dummyImage.png';
import ADButton from '../../antd/ADButton';
import { unSelectWorksheet } from '../../../app/features/worksheet/worksheetSlice';
import { updateAssignment } from '../../../app/features/assignment/assignmentSlice';
import { getClassrooms } from '../../../app/features/classroom/classroomSlice';

export default function AssignStep1({ next, onClose, onCancel }) {
  const selectedWorksheets = useSelector((state) => state.worksheet.selectedWorksheets);
  const currentWorksheet = useSelector((state) => state.worksheet.currentWorksheet);
  const currentClass = useSelector((state) => state.classroom?.currentClass);
  const currentAssignment = useSelector((state) => state.assignment.currentAssignment?.assignment);
  const worksheets = useSelector((state) => state.worksheet.worksheets?.list);
  const data = worksheets.filter((w) => selectedWorksheets.includes(w?._id));

  const [modifiedWorksheets, setModifiedWorksheets] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedWorksheets?.length) {
      const result = worksheets.filter((w) => selectedWorksheets.includes(w?._id));
      setModifiedWorksheets(result);
    } else {
      setModifiedWorksheets([currentWorksheet]);
    }
  }, [selectedWorksheets]);

  const unSelectHandler = (e) => {
    if (selectedWorksheets.includes(e?._id)) {
      dispatch(unSelectWorksheet(e?._id));
    } else {
      setModifiedWorksheets([]);
    }
  };

  const onAssignHandler = async () => {
    const result = await modifiedWorksheets.map((w) => w?._id);
    await dispatch(
      updateAssignment({
        id: currentAssignment?._id,
        content: result
      })
    );
    dispatch(getClassrooms())
      .unwrap()
      .then(() => next());
  };

  return (
    <div className='mt-1'>
      <div>
        <ADTitle level={5} className='text-center pb-3'>
          {`${modifiedWorksheets?.length} Items selected`}
        </ADTitle>
        <div className='min-h-[260px]'>
          {modifiedWorksheets?.length ? (
            <div className='grid grid-cols-5 gap-5'>
              {modifiedWorksheets?.map((w) => (
                <div key={w?._id}>
                  <ADButton type='danger' className='worksheet-delete-button border-0' onClick={() => unSelectHandler(w)}>
                    <BsDashCircle className='text-danger' />
                  </ADButton>
                  <ADImage key={w?._id} className='aspect-square object-cover rounded-lg border border-solid border-slate-300' src={w?.thumbnail} onError={(e) => (e.target.src = dummyImage)} />
                </div>
              ))}
            </div>
          ) : (
            <Empty className='min-h-[260px] flex flex-col justify-center items-center' />
          )}
        </div>
        <p className='text-xs text-center pb-4'>You may continue adding more items to this assignment, or select ASSIGN button to finish assigning.</p>
        <Row gutter={24}>
          <Col xs={24} md={8}>
            <ADButton type='danger' block onClick={onClose}>
              Close
            </ADButton>
          </Col>
          <Col xs={24} md={8}>
            <ADButton type='primary' className='bg-blue-400 border border-solid border-blue-400' block onClick={onCancel}>
              Add more items
            </ADButton>
          </Col>
          <Col xs={24} md={8}>
            <ADButton type='primary' className='bg-blue-400 border border-solid border-blue-400' block onClick={onAssignHandler}>
              Assign
            </ADButton>
          </Col>
        </Row>
      </div>
    </div>
  );
}
