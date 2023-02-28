import React from 'react';
import ADImage from '../antd/ADImage';
import dummyImage from '../../assets/images/dummyImage.png';

const mainContainer = {
  overflow: 'scroll',
  position: 'fixed',
  zIndex: -1
};

const PrintImages = React.forwardRef((props, ref) => {
  const { src, display = false } = props;
  return (
    <div
      style={{
        ...mainContainer,
        display: display ? 'block' : 'none'
      }}
    >
      <div ref={ref}>
        {src.map((item, index) => (
          <ADImage
            width='100%'
            src={item}
            onError={(e) => {
              e.target.src = dummyImage;
            }}
            alt='cardImage'
            className='rounded-2xl w-full object-cover'
          />
        ))}
      </div>
    </div>
  );
});

export default PrintImages;
