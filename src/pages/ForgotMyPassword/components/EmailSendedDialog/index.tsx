import { Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

interface IProps {
  setIsDialogOpen: Dispatch<boolean>;
  isDialogOpen: boolean;
  email: string;
}

export function EmailSendedDialog({
  setIsDialogOpen,
  isDialogOpen,
  email,
}: IProps) {
  const navigate = useNavigate();

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    navigate('/signin');
  };

  return (
    <AlertDialog.Root open={isDialogOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="max-h-screen fixed inset-0 z-50 px-4 bg-blue-800/60 flex items-center justify-center">
          <AlertDialog.Content className="w-fit px-4 py-4 rounded-md bg-blue-700 space-y-2">
            <AlertDialog.Title className="text-white text-xl">
              Email enviado
            </AlertDialog.Title>
            <div className="flex flex-col gap-4 text-white max-w-md">
              <p>
                Procure o e-mail de redefinição de senha na caixa de entrada de
                <strong> {email}</strong>. Se você não receber o e-mail em
                breve, tente novamente.
              </p>
              <button
                className="bg-yellow-500 text-white hover:opacity-50 transition-opacity w-full max-w-md py-2 px-2 mt-2 rounded-md disabled:opacity-50"
                type="submit"
                onClick={handleCloseDialog}>
                Ok
              </button>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
