import { Input } from 'antd';

function ADInput({ children, className, size, ...props }) {
  return (
    <Input
      className={`${className ?? ''}${' '}
      ${size === 'default' && 'border-2 rounded-md h-12 text-base flex-1 w-full'}
      
      `}
      {...props}
    />
  );
}
ADInput.defaultProps = {
  size: 'default'
};

export default ADInput;
