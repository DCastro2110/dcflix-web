import { ButtonHTMLAttributes, ReactNode } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  title: string;
  onClick: () => void;
}

export function IconButton({ children, onClick, title }: IProps) {
  return (
    <button
      className="w-fit flex justify-center items-center text-white"
      type="button"
      onClick={onClick}
      title={title}>
      {children}
    </button>
  );
}
