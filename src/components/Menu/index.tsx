/* eslint-disable consistent-return */
import { Dispatch, useEffect, useRef, MouseEvent } from 'react';
import { X } from 'phosphor-react';

import { MenuItem } from '../MenuItem';
import { IconButton } from '../IconButton';

interface IProps {
  menuOpen: {
    isMenuOpen: boolean;
    setIsMenuOpen: Dispatch<boolean>;
  };
}

export function Menu({ menuOpen: { isMenuOpen, setIsMenuOpen } }: IProps) {
  const menuOverlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scroll({
      top: 0,
    });
  }, []);

  useEffect(() => {
    if (!menuOverlay?.current) return;

    const overlay = menuOverlay.current;

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      overlay.classList.remove('hidden');
      setTimeout(() => {
        overlay.classList.remove('opacity-0');
      }, 160);
      return;
    }

    document.body.style.overflow = 'auto';
    overlay.classList.add('opacity-0');
    setTimeout(() => {
      overlay.classList.add('hidden');
    }, 160);
  }, [isMenuOpen]);

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div
      className="fixed z-50 inset-0 bg-blue-800/40 hidden transition-opacity"
      ref={menuOverlay}
      onClick={handleOverlayClick}
      role="presentation">
      <div
        role="menu"
        className="bg-blue-800 h-full max-w-[20rem] px-4 py-4 space-y-16">
        <IconButton handleClick={() => setIsMenuOpen(false)}>
          <X
            className="hover:text-yellow-500"
            size={24}
          />
        </IconButton>
        <nav
          role="navigation"
          className="w-full flex flex-col justify-center gap-2">
          <MenuItem to="/browse">Início</MenuItem>
          <MenuItem to="/filter/tv">Séries</MenuItem>
          <MenuItem to="/filter/action">Ação</MenuItem>
          <MenuItem to="/filter/horror">Terror</MenuItem>
          <MenuItem to="/filter/drama">Drama</MenuItem>
          <MenuItem to="/filter/mistery">Suspense</MenuItem>
          <MenuItem to="/filter/romance">Romance</MenuItem>
          <MenuItem to="/filter/comedy">Comédia</MenuItem>
          <MenuItem to="/filter/documentary">Documentário</MenuItem>
          <MenuItem to="/my-list">Minha Lista</MenuItem>
        </nav>
      </div>
    </div>
  );
}
