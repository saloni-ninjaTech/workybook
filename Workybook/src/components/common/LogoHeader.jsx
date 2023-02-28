import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import ADImage from '../antd/ADImage';

function LogoHeader() {
  const { Header } = Layout;
  return (
    <Header className='h-20 relative container mx-auto'>
      <div className='flex items-center justify-between pt-2'>
        <div>
          <Link to='/'>
            <ADImage
              src={logo}
              alt='logo'
              style={{
                width: 100
              }}
            />
          </Link>
        </div>
      </div>
    </Header>
  );
}

export default LogoHeader;
