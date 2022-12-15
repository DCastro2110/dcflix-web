import { useId, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { AuthContext } from '@/contexts/AuthContext';

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

  const emailInputId = useId();
  const passwordInputId = useId();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    async onSubmit(values) {
      try {
        const req = await login(values);
        if (req.data.user.id) {
          setUser(req.data.user);
          console.log(req.data);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="flex min-h-screen">
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
                className="bg-yellow-500 text-white hover:opacity-50 transition-opacity w-full max-w-md py-4 px-8 mt-2 rounded-md"
                type="submit">
                Entrar
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
