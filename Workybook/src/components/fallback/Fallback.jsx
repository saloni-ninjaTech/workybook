import React from 'react';
import ADTitle from '../antd/ADTitle';

function Fallback() {
  return (
    <ADTitle level={3} className='flex justify-center items-center h-[851px]'>
      Something Wrong!, not able to load current Page
    </ADTitle>
  );
}

export default Fallback;
