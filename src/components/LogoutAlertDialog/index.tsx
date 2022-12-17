import { Dispatch, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

import { AuthContext } from '@/contexts/AuthContext';

import { Loading } from '../Loading';

import { logout } from '@/services/dcflixApi/logout';

interface IProps {
  setIsDialogOpen: Dispatch<boolean>;
}

export function LogoutAlertDialog({ setIsDialogOpen }: IProps) {
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setUser({
        id: '',
        email: '',
        name: '',
      });
      navigate('/');
    },
    onError: () => {
      toast.error('Não foi possível se desconectar. Tente novamente!');
    },
  });

  if (logoutMutation.isLoading) {
    return <Loading />;
  }

  return (
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="max-h-screen fixed inset-0 z-50 px-4 bg-blue-800/60 flex items-center justify-center">
        <AlertDialog.Content className="w-fit px-4 py-8 rounded-md bg-blue-700">
          <AlertDialog.Title>
            <h1 className="text-white text-lg">Tem certeza que deseja sair?</h1>
          </AlertDialog.Title>
          <div className="flex gap-4">
            <AlertDialog.Action>
              <button
                className="bg-white/30 text-white hover:opacity-50 transition-opacity w-full max-w-md py-4 px-8 mt-2 rounded-md"
                type="button"
                onClick={() => setIsDialogOpen(false)}>
                Não desejo sair!
              </button>
            </AlertDialog.Action>
            <button
              className="bg-yellow-500 text-white hover:opacity-50 transition-opacity w-full max-w-md py-4 px-8 mt-2 rounded-md disabled:opacity-50"
              type="submit"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isLoading}>
              {logoutMutation.isLoading ? (
                <div className="w-6 h-6 mx-auto rounded-full border border-t-0 border-r-0 border-white animate-spin" />
              ) : (
                'Sair'
              )}
            </button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Overlay>
    </AlertDialog.Portal>
  );
}
