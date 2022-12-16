import { useId, useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { AuthContext } from '@/contexts/AuthContext';

import { useAuth } from '@/hooks/useAuth';

import { Loading, Toast } from '@/components';

import { login } from '@/services/dcflixApi/login';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Email inválido.')
    .required('O campo "email" não pode ficar vazio.'),
  password: yup.string().required('O campo "senha" não pode ficar vazio.'),
});

export function SignIn() {
  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (values: yup.InferType<typeof validationSchema>) =>
      login(values),
    onSuccess: (data) => {
      setUser(data.data.user);
      navigate('/browse');
    },
    onError: (err) => {
      if (!(err instanceof AxiosError)) return;

      if (err.response!.data.message === 'User not found.') {
        toast.error('Usuário não encontrado.');
        return;
      }
      if (err.response!.data.message === 'Password is wrong.') {
        toast.error('Senha incorreta. Tente novamente!.');
        return;
      }

      toast.error('Erro ao entrar. Tente novamente!.');
    },
  });

  const emailInputId = useId();
  const passwordInputId = useId();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    async onSubmit(values) {
      loginMutation.mutate(values);
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
          <legend className="text-white text-2xl md:text-3xl text-center font-bold w-full">
            Entrar
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
            <div className="w-full">
              <button
                className="bg-yellow-500 text-white hover:opacity-50 transition-opacity w-full max-w-md py-4 px-8 mt-2 rounded-md disabled:opacity-50"
                type="submit"
                disabled={loginMutation.isLoading}>
                {loginMutation.isLoading ? (
                  <div className="w-6 h-6 mx-auto rounded-full border border-t-0 border-r-0 border-white animate-spin" />
                ) : (
                  'Entrar'
                )}
              </button>

              <Link
                className="block text-white hover:text-yellow-500 text-center w-full mt-2"
                to="/signup">
                Esqueci minha senha
              </Link>
            </div>
          </form>
          <Link
            className="block text-gray-400 text-center w-full mt-2"
            to="/signup">
            Ainda não tem uma conta?{' '}
            <span className="text-white hover:text-yellow-500">
              Crie agora mesmo
            </span>
            .
          </Link>
        </fieldset>
      </div>
    </div>
  );
}
