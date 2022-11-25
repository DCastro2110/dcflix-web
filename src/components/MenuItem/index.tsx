import { NavLink } from 'react-router-dom';

interface IProps {
  to: string;
  children: string;
}

export function MenuItem({ to, children }: IProps) {
  return (
    <NavLink
      className="text-2xl text-white hover:text-yellow-500"
      to={to}
      role="menuitem">
      {children}
    </NavLink>
  );
}
