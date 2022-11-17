import { List, User, MagnifyingGlass } from 'phosphor-react';

import { IconButton } from '../IconButton';

export function Header() {
  const handleClick = () => {
    console.log('HEADER - ICON BUTTON => FUI CLICADO');
  };

  return (
    <header className="fixed w-full h-20">
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

        <div className="w-10 flex gap-4">
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
