/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import { Col, Input, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ADButton from '../../antd/ADButton';
import ADTitle from '../../antd/ADTitle';
import ADImage from '../../antd/ADImage';
import { createCollection, getCollections, updateCollection } from '../../../app/features/collection/collectionSlice';
import dummyImage from '../../../assets/images/dummyImage.png';
import Spinner from '../../spinner/Spinner';

export default function NewCollection({ onCancel }) {
  const currentWorksheet = useSelector((state) => state.worksheet.currentWorksheet);
  const selectedWorksheets = useSelector((state) => state.worksheet.selectedWorksheets);
  const collections = useSelector((state) => state.collection.collections?.list);
  const loading = useSelector((s) => s.collection.isLoading);
  const [inputVal, setInputVal] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputVal(e.target.value);
  };

  const onCreateCollection = async () => {
    if (selectedWorksheets?.length === 0) {
      const data = {
        title: inputVal,
        favorite: false
        // content: [currentWorksheet?._id]
      };
      await dispatch(createCollection(data));
    } else {
      const data = {
        title: inputVal,
        favorite: false
        // content: selectedWorksheets
      };
      await dispatch(createCollection(data));
    }
    await dispatch(getCollections());
    await setInputVal('');
  };

  const addCollectionHandler = (e) => {
    if (selectedWorksheets.length) {
      const data = {
        collectionId: e,
        content: selectedWorksheets
      };
      dispatch(updateCollection(data));
    } else {
      const data = {
        collectionId: e,
        content: [currentWorksheet?._id]
      };
      dispatch(updateCollection(data));
    }
    onCancel();
  };

  return (
    <div>
      <ADTitle level={3} className='text-center pb-8'>
        Add to Collection
      </ADTitle>
      <Row className='pb-8'>
        <Col xs={24} sm={8}>
          <div className='rounded-lg overflow-hidden'>
            <ADImage src={currentWorksheet?.thumbnail} alt='thumbnail-worksheet-img' onError={(e) => (e.target.src = dummyImage)} className='w-full object-cover aspect-[3/4]' />
          </div>
        </Col>
        <Col xs={24} sm={16}>
          <div className='sm:pl-4'>
            <ADTitle level={5}>Create new</ADTitle>
            <Row gutter={16} className='py-4' wrap={false}>
              <Col xs={24} flex='auto'>
                <Input type='text' className='w-full flex min-w-full' value={inputVal} onChange={handleChange} name='collectionName' />
              </Col>
              <Col xs={24} flex='none'>
                <ADButton type='primary' size='small' className='!rounded-full' onClick={onCreateCollection}>
                  Create
                </ADButton>
              </Col>
            </Row>
            <div className='border border-solid border-black border-x-0 border-t-0' />
            <ADTitle level={5} className='py-4'>
              Add to existing Collection
            </ADTitle>
            {loading ? (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'
              }}
              >
                <Spinner />
              </div>
            ) : (
              <div className='max-h-56 overflow-y-auto'>
                {collections?.map((i) => (
                  <Row key={i._id} gutter={16} className='mt-4 cursor-pointer' onClick={() => addCollectionHandler(i._id)}>
                    <Col flex='none'>
                      <ADImage src={collections?.content?.[0]?.thumbnail} onError={(e) => (e.target.src = dummyImage)} className='h-auto w-[75px] aspect-[4/3] rounded-lg object-cover' />
                    </Col>
                    <Col xs={24} flex='auto' className='flex items-center'>
                      {i.title || ''}
                    </Col>
                  </Row>
                ))}
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
