import { useId, useContext, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { AuthContext } from '@/contexts/AuthContext';

import { useAuth } from '@/hooks/useAuth';

import { Loading, RecoverPasswordDialog, Toast } from '@/components';

import { verifyIfUrlIdIsValid } from '@/services/dcflixApi/verifyIfUrlIdIsValid';
import { changePassword } from '@/services/dcflixApi/changePassword';

const validationSchema = yup.object({
  password: yup
    .string()
    .min(8, 'O campo "senha" deve ter no mínimo 8 caracteres.')
    .required('O campo "senha" não pode ficar vazio.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'O campo "senha" deve ter ao menos uma letra maiúscula, uma minúscula e um número.'
    ),
  passwordConfirmation: yup
    .string()
    .required('O campo "confirmar senha" não pode ficar vazio.')
    .oneOf([yup.ref('password'), null], 'As senhas não são iguais.'),
});

export function ChangeMyPassword() {
  const { user } = useContext(AuthContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const passwordInputId = useId();
  const passwordConfirmationInputId = useId();

  const { id: urlId } = useParams();
  const navigate = useNavigate();

  const isUrlIdValidQuery = useQuery({
    queryFn: () => verifyIfUrlIdIsValid(urlId as string),
    onError: (err) => {
      if (!(err instanceof AxiosError)) {
        toast.error('Erro de conexão. Tente novamente!');
        navigate('/signin');
        return;
      }

      if (err.response?.status === 400) {
        toast.error('Link para alterar a senha é inválido.');
        navigate('/signin');
        return;
      }

      toast.error('Erro interno. Tente novamente!');
      navigate('/signin');
    },
    enabled: !!urlId,
  });

  const changePasswordMutation = useMutation({
    mutationFn: (body: yup.InferType<typeof validationSchema>) =>
      changePassword(urlId as string, body),
    onError: (err) => {
      if (!(err instanceof AxiosError)) {
        toast.error('Erro de conexão. Tente novamente!');
        navigate('/signin');
        return;
      }

      if (
        err.response!.data.message === 'The id has expired.' ||
        err.response!.data.message === 'Id not found.'
      ) {
        toast.error('Link para alterar a senha é inválido.');
        navigate('/signin');
        return;
      }

      toast.error('Erro interno. Tente novamente!');
      navigate('/signin');
    },
    onSuccess: () => {
      setIsDialogOpen(true);
    },
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirmation: '',
    },
    validationSchema,
    async onSubmit(values) {
      changePasswordMutation.mutate(values);
    },
  });

  const { isLoading } = useAuth();

  if (user.id) {
    return <Navigate to="/browse" />;
  }

  if ((isLoading && !user.id) || isUrlIdValidQuery.isLoading) {
    return <Loading />;
  }

  const dialogText = (
    <p>
      Sua senha foi redefinida com sucesso. Clique em {`"Ok"`} para ir para
      página de login e entre em sua conta.
    </p>
  );

  return (
    <div className="flex min-h-screen">
      <RecoverPasswordDialog
        setIsDialogOpen={setIsDialogOpen}
        isDialogOpen={isDialogOpen}
        title="Senha redefinida"
        text={dialogText}
      />
      <Toast />
      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-4">
        <img
          className="w-36 md:w-48"
          src="/images/logo.svg"
          alt="Logo da DCFlix"
        />

        <fieldset className="h-fit w-fit p-8 bg-blue-700 rounded-md">
          <legend className="text-white text-xl md:text-2xl text-center font-bold w-full">
            Recuperar senha
          </legend>
          <form
            className="h-full w-full flex flex-col justify-center items-center gap-4"
            onSubmit={formik.handleSubmit}
            method="POST">
            <div className="w-full max-w-md space-y-2">
              <label
                className="text-white text-lg font-bold"
                htmlFor={passwordInputId}>
                Senha
              </label>
              <input
                className="w-full max-w-md py-4 px-8 rounded-md outline-yellow-500"
                id={passwordInputId}
                placeholder="yupo%788$%hdh"
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <span className="block text-red-500 mt-2">
                {formik.submitCount > 0 && formik.errors.password}
              </span>
            </div>
            <div className="w-full max-w-md space-y-2">
              <label
                className="text-white text-lg font-bold"
                htmlFor={passwordConfirmationInputId}>
                Confirmar senha
              </label>
              <input
                className="w-full max-w-md py-4 px-8 rounded-md outline-yellow-500"
                id={passwordConfirmationInputId}
                placeholder="yupo%788$%hdh"
                type="password"
                name="passwordConfirmation"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirmation}
              />
              <span className="block text-red-500 mt-2">
                {formik.submitCount > 0 && formik.errors.passwordConfirmation}
              </span>
            </div>
            <div className="w-full">
              <button
                className="bg-yellow-500 text-white hover:opacity-50 transition-opacity w-full max-w-md py-4 px-8 mt-2 rounded-md disabled:opacity-50"
                type="submit"
                disabled={changePasswordMutation.isLoading}>
                {changePasswordMutation.isLoading ? (
                  <div className="w-6 h-6 mx-auto rounded-full border border-t-0 border-r-0 border-white animate-spin" />
                ) : (
                  'Recuperar senha'
                )}
              </button>

              <Link
                className="block text-white hover:text-yellow-500 text-center w-full mt-2"
                to="/signin">
                Lembrou da senha? Tente entrar novamente.
              </Link>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
}
