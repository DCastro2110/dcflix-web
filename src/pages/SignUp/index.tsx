import { useId, useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { AuthContext } from '@/contexts/AuthContext';

import { useAuth } from '@/hooks/useAuth';

import { Loading, Toast } from '@/components';

import { register } from '@/services/dcflixApi/register';

const validationSchema = yup.object({
  name: yup.string().required('O campo "nome" não pode ficar vazio.'),
  email: yup
    .string()
    .email('Email inválido.')
    .required('O campo "email" não pode ficar vazio.'),
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

export function SignUp() {
  const { user, setUser } = useContext(AuthContext);

  const nameInputId = useId();
  const emailInputId = useId();
  const passwordInputId = useId();
  const passwordConfirmationInputId = useId();

  const navigation = useNavigate();

  const registerMutation = useMutation({
    mutationFn: (values: yup.InferType<typeof validationSchema>) =>
      register(values),
    onSuccess: (data) => {
      setUser(data.data.user);
      navigation('/browse');
    },
    onError: (err) => {
      if (!(err instanceof AxiosError)) return;

      if (err.response!.data.message === 'E-mail already registered.') {
        toast.error('Email já registrado.');
        return;
      }

      toast.error('Erro ao cadastrar. Tente novamente!.');
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema,
    onSubmit(values) {
      registerMutation.mutate(values);
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
            Cadastrar
          </legend>
          <form
            className="h-full w-full flex flex-col justify-center items-center gap-4"
            onSubmit={formik.handleSubmit}
            method="POST">
            <div className="w-full max-w-md space-y-2">
              <label
                className="text-white text-lg font-bold"
                htmlFor={nameInputId}>
                Nome
              </label>
              <input
                className="w-full py-4 px-8 rounded-md outline-yellow-500"
                id={nameInputId}
                placeholder="Yuri dos Santos"
                type="text"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              <span className="block text-red-500 mt-2">
                {formik.submitCount > 0 && formik.errors.name}
              </span>
            </div>
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
                className="bg-yellow-500 text-white hover:opacity-50 transition-opacity w-full max-w-md py-4 px-8 mt-2 rounded-md"
                type="submit">
                Entrar
              </button>
            </div>
          </form>
          <Link
            className="block text-gray-400 text-center w-full mt-2"
            to="/signin">
            Já tem uma conta?{' '}
            <span className="text-white hover:text-yellow-500">
              Entre agora mesmo.
            </span>
          </Link>
        </fieldset>
      </div>
    </div>
  );
}
