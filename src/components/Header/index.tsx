import { useEffect, useState } from 'react';
import { List, User, MagnifyingGlass } from 'phosphor-react';

import { IconButton } from '../IconButton';

interface IProps {
  layout?: 'simple' | 'categories' | 'search';
}

export function Header({ layout = 'simple' }: IProps) {
  const [isHeaderTransparent, setIsHeaderTransparent] = useState<boolean>(true);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 50) {
        setIsHeaderTransparent(false);
        return;
      }
      setIsHeaderTransparent(true);
    });
  }, []);

  const handleClick = () => {
    console.log('HEADER - ICON BUTTON => FUI CLICADO');
  };

  return (
    <header
      className={`fixed z-50 w-full h-20 transition-colors ${
        layout === 'simple' && isHeaderTransparent
          ? 'bg-transparent'
          : 'bg-blue-800'
      }`}>
      <div className="h-full container max-w-[1600px] flex justify-between items-center">
        <div className="w-10">
          <IconButton handleClick={handleClick}>
            <List size={24} />
          </IconButton>
        </div>

        <a href="/browse">
          <img
            className="w-20 md:w-24"
            src="/images/logo.svg"
            alt="Logo da DCFlix"
          />
        </a>

        <div className="w-10 flex justify-end gap-4">
          <IconButton handleClick={handleClick}>
            <User size={24} />
          </IconButton>
          <IconButton handleClick={handleClick}>
            <MagnifyingGlass size={24} />
          </IconButton>
        </div>
      </div>
    </header>
  );
}
