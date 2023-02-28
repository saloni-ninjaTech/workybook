import React from 'react';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons';
import { Button, Layout, Typography } from 'antd';
import ADButton from '../antd/ADButton';

const { Footer } = Layout;
const { Text } = Typography;

function Footers() {
  return (
    <Footer className='flex flex-col items-center justify-between md:flex-row px-2 md:px-12 lg:px-24'>
      <div className='flex flex-col items-center justify-center md:items-start md:justify-start'>
        <Text>{`©️ ${new Date().getFullYear()} ERC-20 Token. All rights reserved.`}</Text>

        <div>
          <ADButton type='link'>How to buy?</ADButton>
          <ADButton type='link'>Privacy and Policy</ADButton>
          <ADButton type='link'>Terms and Condition</ADButton>
        </div>
      </div>

      <div className='space-x-4 md:space-x-2'>
        <ADButton type='dashed' shape='circle' icon={<FacebookOutlined />} size='middle' />
        <ADButton type='dashed' shape='circle' icon={<InstagramOutlined />} size='middle' />
        <ADButton type='dashed' shape='circle' icon={<TwitterOutlined />} size='middle' />
        <ADButton type='dashed' shape='circle' icon={<YoutubeOutlined />} size='middle' />
      </div>
    </Footer>
  );
}

export default Footers;
