import React, { useState, useMemo } from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FaLink } from 'react-icons/fa';
import { EmailShareButton, PinterestShareButton, PinterestIcon, EmailIcon, FacebookShareButton, FacebookIcon } from 'react-share';
import ADButton from '../antd/ADButton';
import ADModal from '../antd/ADModal';

function ShareModal({ onOk, path, multiple, item, ...props }) {
  const [copied, setCopied] = useState(false);

  const { thumbnail } = item || {
  };

  const link = useMemo(() => {
    let result = '';
    for (let i = 0; i < path.length; i += 1) {
      result = `${result + window.location.origin + path[i]} `;
    }
    return result;
  }, [path]);

  const copyHandler = () => {
    const el = document.createElement('input');
    el.value = link;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <ADModal closable={false} footer={null} width={680} {...props}>
      <div className='flex items-center justify-between'>
        <div className='flex mx-0'>SHARE</div>
        <div className='text-2xl flex mx-2'>
          <EmailShareButton url={String(link)} subject='Subject is here' body='this is body' className='flex justify-center'>
            <EmailIcon size={28} round />
          </EmailShareButton>
        </div>
        {!multiple ? (
          <div className='text-2xl flex mx-2'>
            <PinterestShareButton media={thumbnail} title='Pinterest' url={String(link)} className='flex justify-center'>
              <PinterestIcon size={28} round />
            </PinterestShareButton>
          </div>
        ) : null}

        <div className='text-2xl flex mx-2'>
          <FacebookShareButton url={link} className='flex justify-center'>
            <FacebookIcon size={28} round />
          </FacebookShareButton>
        </div>
        {!multiple ? (
          <div className='text-2xl flex mx-2'>
            <ADButton onClick={copyHandler} type='text' className='!p-0 text-gray-400 flex items-center w-full'>
              {!copied ? <FaLink className='text-xl px-px' /> : <BsFillCheckCircleFill className='text-primary text-2xl font-bold' />}
            </ADButton>
          </div>
        ) : null}
      </div>
    </ADModal>
  );
}

export default ShareModal;
