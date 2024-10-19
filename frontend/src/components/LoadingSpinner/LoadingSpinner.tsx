import { FC } from 'react';

type Props = {
  size?: number;
};

const LoadingSpinner: FC<Props> = ({ size }) => {
  return (
    <svg
      className='spinner'
      style={{ width: `${size ? size : 50}px`, height: `${size ? size : 50}px` }}
      viewBox='0 0 50 50'>
      <circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth='5'></circle>
    </svg>
  );
};

export default LoadingSpinner;
