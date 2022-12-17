import { useEffect, useState, Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, SignOut, MagnifyingGlass } from 'phosphor-react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

import { Menu } from '../Menu';
import { IconButton } from '../IconButton';
import { LogoutAlertDialog } from '../LogoutAlertDialog';

interface IProps {
  layout?: 'simple' | 'categories' | 'search';
  pageTitle?: string;
  query?: {
    query: string;
    setQuery: Dispatch<string>;
  };
}

export function Header({ layout = 'simple', query, pageTitle }: IProps) {
  const [isHeaderTransparent, setIsHeaderTransparent] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 50) {
        setIsHeaderTransparent(false);
        return;
      }
      setIsHeaderTransparent(true);
    });
  }, []);

  const isInputShow = layout === 'search' && query;
  const isPageTitleShow = layout === 'categories' && pageTitle;

  return (
    <>
      <Menu
        menuOpen={{
          isMenuOpen,
          setIsMenuOpen,
        }}
      />
      <header
        className={`fixed z-40 w-full transition-colors ${
          layout === 'simple' ? 'h-20' : 'h-36'
        } ${
          layout === 'simple' && isHeaderTransparent
            ? 'bg-transparent'
            : 'bg-blue-800'
        }`}>
        <div className="h-full py-2 container max-w-[1600px] flex-col justify-center">
          <div className="flex justify-between items-center">
            <div className="w-24 flex justify-start">
              <IconButton
                title="Abrir menu"
                onClick={() => setIsMenuOpen(true)}>
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
              {layout !== 'search' && (
                <IconButton
                  title="Pesquisar mídia"
                  onClick={() => navigate('/search')}>
                  <MagnifyingGlass size={24} />
                </IconButton>
              )}
              <AlertDialog.Root open={isDialogOpen}>
                <AlertDialog.Trigger>
                  <IconButton
                    title="Logout"
                    onClick={() => setIsDialogOpen(true)}>
                    <SignOut size={24} />
                  </IconButton>
                </AlertDialog.Trigger>
                <LogoutAlertDialog setIsDialogOpen={setIsDialogOpen} />
              </AlertDialog.Root>
            </div>
          </div>
          {isInputShow && (
            <div className="flex justify-center items-center p-2">
              <input
                className="py-3 px-4 max-w-sm w-full bg-blue-700/50 border border-yellow-500 rounded-md text-white text-center outline-none"
                placeholder="O que você está procurando?"
                value={query.query}
                onChange={(e) => query.setQuery(e.target.value)}
              />
            </div>
          )}
          {isPageTitleShow && (
            <h2 className="text-white text-xl font-bold">{pageTitle}</h2>
          )}
        </div>
      </header>
    </>
  );
}
