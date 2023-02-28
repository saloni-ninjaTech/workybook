import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import ADButton from '../components/antd/ADButton';

function NotFound() {
  window.document.title = 'React App — Not Found';

  return (
    <div className='flex h-screen justify-center items-center'>
      <Result
        status='404'
        title='404 - Not Found!'
        subTitle='Sorry, the page you visited does not exist.'
        extra={(
          <Link to='/'>
            <ADButton type='primary' size='large' shape='round'>
              🏡 Back to Home
            </ADButton>
          </Link>
        )}
      />
    </div>
  );
}

export default NotFound;
