/* eslint-disable no-return-assign */
import { Row, Col, Empty } from 'antd';
import { BsDashCircle } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ADTitle from '../antd/ADTitle';
import ADImage from '../antd/ADImage';
import dummyImage from '../../assets/images/dummyImage.png';
import ADButton from '../antd/ADButton';
import { getAssignments, updateAssignment } from '../../app/features/assignment/assignmentSlice';
import { unSelectCollection } from '../../app/features/collection/collectionSlice';

export default function AssignCollectionStep1({ next, onClose, onCancel, inDetail }) {
  const selectedCollections = useSelector((state) => state.collection.selectedCollections);
  const currentCollection = useSelector((state) => state.collection.currentCollection);
  const currentAssignment = useSelector((state) => state.assignment.currentAssignment?.assignment);
  const collections = useSelector((state) => state.collection.collections?.list);

  const [modifiedCollections, setModifiedCollections] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedCollections?.length) {
      const result = collections.filter((c) => selectedCollections.includes(c?._id));
      setModifiedCollections(result);
    } else {
      setModifiedCollections([currentCollection]);
    }
  }, [selectedCollections]);

  const unSelectHandler = (e) => {
    if (selectedCollections.includes(e?._id)) {
      dispatch(unSelectCollection(e?._id));
    } else {
      setModifiedCollections([]);
    }
  };

  const onAssignHandler = async () => {
    const result = await modifiedCollections.map((c) => c?._id);
    await dispatch(
      updateAssignment({
        id: currentAssignment?._id,
        collection: result
      })
    );
    dispatch(getAssignments())
      .unwrap()
      .then(() => next());
  };

  return (
    <div className='mt-1'>
      <div>
        <ADTitle level={5} className='text-center pb-3'>
          {`${modifiedCollections?.length} collections selected`}
        </ADTitle>
        <div className='min-h-[260px]'>
          {modifiedCollections?.length ? (
            <div className='grid grid-cols-4 gap-4'>
              {modifiedCollections?.map((c) => (
                <div key={c?._id} className='bg-slate-200 rounded-md p-1 shadow'>
                  {!inDetail && (
                    <ADButton type='danger' className='worksheet-delete-button border-0' onClick={() => unSelectHandler(c)}>
                      <BsDashCircle className='text-danger' />
                    </ADButton>
                  )}
                  <Row gutter={[4, 4]} className=' aspect-[16/9]'>
                    {c.thumbnailList.slice(0, 4).map((item, index) => (
                      <Col key={index} xs={24} sm={12}>
                        <ADImage onError={(e) => (e.target.src = dummyImage)} preview={false} src={item} className='rounded-sm aspect-[16/9] object-cover w-full' />
                      </Col>
                    ))}
                  </Row>
                  <div className='text-center pt-1 text-xs'>{c?.title}</div>
                </div>
              ))}
            </div>
          ) : (
            <Empty className='min-h-[260px] flex flex-col justify-center items-center' />
          )}
        </div>
        {!inDetail && <p className='text-xs text-center pb-4'>You may continue adding more items to this assignment, or select ASSIGN button to finish assigning.</p>}
        <Row gutter={24}>
          <Col xs={24} md={8}>
            <ADButton type='danger' block onClick={onClose}>
              Close
            </ADButton>
          </Col>
          <Col xs={24} md={8}>
            {!inDetail && (
              <ADButton type='primary' className='bg-blue-400 border border-solid border-blue-400' block onClick={onCancel}>
                Add more items
              </ADButton>
            )}
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
