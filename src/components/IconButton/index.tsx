import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  handleClick: () => void;
}

export function IconButton({ children, handleClick }: IProps) {
  return (
    <button
      type="button"
      className="flex justify-center items-center"
      onClick={handleClick}>
      {children}
    </button>
  );
}
