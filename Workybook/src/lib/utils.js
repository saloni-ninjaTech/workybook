import { Modal, Typography } from 'antd';

export const popupModalComponent = (type = 'info', title = '', content = '', redirect = false) => {
  const config = {
    title: (
      <Typography.Title level={1} className='!text-2xl md:!text-2xl mt-[30px] text-center'>
        {title}
      </Typography.Title>
    ),
    content: (
      <Typography.Title level={5} className='!font-normal !mt-[16px] !mb-[76px] !text-[14px] text-center'>
        {content}
      </Typography.Title>
    ),
    icon: <div />,
    okText: 'Okay',
    centered: true,
    style: {
      textAlign: 'center'
    },
    className: 'customModal',
    onOk: () => {
      const nextURL = '/';
      // const nextTitle = 'Workybook - Home';
      // const nextState = {};

      // This will create a new entry in the browser's history, without reloading
      // window.history.pushState(nextState, nextTitle, nextURL);
      window.location.assign(nextURL);
    }
  };
  switch (type) {
    case 'info':
      Modal.info(config);
      break;
    case 'warning':
      Modal.warning(config);
      break;
    case 'success':
      Modal.success(config);
      break;
    case 'error':
      Modal.error(config);
      break;
    default:
      Modal.info(config);
      break;
  }
};
