import { useId, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { AuthContext } from '@/contexts/AuthContext';

import { useAuth } from '@/hooks/useAuth';

import { Loading, Toast } from '@/components';

import { getLinkToRecoverPassword } from '@/services/dcflixApi/getLinkToRecoverPassword';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Email inválido.')
    .required('O campo "email" não pode ficar vazio.'),
});

export function ForgotMyPassword() {
  const { user } = useContext(AuthContext);

  const emailInputId = useId();

  const forgotPasswordMutation = useMutation({
    mutationFn: (body: yup.InferType<typeof validationSchema>) =>
      getLinkToRecoverPassword(body),
    onError: (err) => {
      if (!(err instanceof AxiosError)) return;

      if (err.response!.data.message === 'User not found.') {
        toast.error('Usuário não encontrado.');
        return;
      }

      toast.error('Erro interno. Tente novamente!');
    },
    onSuccess: () => {
      toast.success('Um link de recuperação foi enviado para seu email.');
    },
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    async onSubmit(values) {
      forgotPasswordMutation.mutate(values);
    },
  });

  const { isLoading } = useAuth();

  if (user.id) {
    return <Navigate to="/browse" />;
  }

  if (isLoading && !user.id) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen">
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
                htmlFor={emailInputId}>
                Email
              </label>
              <input
                className="w-full py-4 px-8 rounded-md outline-yellow-500"
                id={emailInputId}
                placeholder="example@provider.com"
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <span className="block text-red-500 mt-2">
                {formik.submitCount > 0 && formik.errors.email}
              </span>
            </div>
            <div className="w-full">
              <button
                className="bg-yellow-500 text-white hover:opacity-50 transition-opacity w-full max-w-md py-4 px-8 mt-2 rounded-md disabled:opacity-50"
                type="submit"
                disabled={forgotPasswordMutation.isLoading}>
                {forgotPasswordMutation.isLoading ? (
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
