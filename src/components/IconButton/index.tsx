import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  handleClick: () => void;
}

export function IconButton({ children, handleClick }: IProps) {
  return (
    <button
      className="w-fit flex justify-center items-center text-white"
      type="button"
      onClick={handleClick}>
      {children}
    </button>
  );
}
