import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { resetSelectedWorksheets } from '../../app/features/worksheet/worksheetSlice';
import FileUtils from '../common/FileUtils';
import { CollectionsAction } from '../CollectionsAction';
import Headers from '../common/Headers';
import SearchBar from '../common/SearchBar';
import { resetSelectedCollections } from '../../app/features/collection/collectionSlice';

const { Content } = Layout;

function MainLayout({ children, className }) {
  const selectedWorksheets = useSelector((state) => state.worksheet.selectedWorksheets);

  const [showMultiple, setShowMultiple] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetSelectedWorksheets());
    dispatch(resetSelectedCollections());
  }, []);

  useEffect(() => {
    setShowMultiple(selectedWorksheets?.length);
  }, [selectedWorksheets]);

  return (
    <Layout className={`${className ?? ''}`}>
      <Headers />
      {user && <SearchBar />}
      <Content className='bg-white'>{children}</Content>
      <FileUtils
        show={showMultiple > 0}
        style={{
          display: `${showMultiple ? 'block' : 'none'}`
        }}
      />
      <CollectionsAction />
    </Layout>
  );
}

export default MainLayout;
