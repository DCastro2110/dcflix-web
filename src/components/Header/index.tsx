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
      className={`fixed z-50 w-full transition-colors ${
        layout === 'simple' ? 'h-20' : 'h-36'
      } ${
        layout === 'simple' && isHeaderTransparent
          ? 'bg-transparent'
          : 'bg-blue-800'
      }`}>
      <div className="h-full container max-w-[1600px] flex-col justify-center">
        <div className="flex justify-between items-center p-2">
          <div className="w-24">
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

          <div className="w-24 flex justify-end gap-4">
            <IconButton handleClick={handleClick}>
              <User size={24} />
            </IconButton>
            <IconButton handleClick={handleClick}>
              <MagnifyingGlass size={24} />
            </IconButton>
          </div>
        </div>
        {layout === 'search' && (
          <div className="flex justify-center items-center p-2">
            <input
              className="py-3 px-4 max-w-sm w-full bg-blue-700/50 border border-yellow-500 rounded-md text-white text-center outline-none"
              placeholder="O que você está procurando?"
            />
          </div>
        )}
      </div>
    </header>
  );
}
