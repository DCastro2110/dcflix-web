import { useId } from 'react';
import { Link } from 'react-router-dom';

export function SignIn() {
  const emailInputId = useId();
  const passwordInputId = useId();

  return (
    <div className="flex min-h-screen max-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-4">
        <img
          className="w-48"
          src="/images/logo.svg"
          alt="Logo da DCFlix"
        />

        <fieldset className="h-fit w-fit p-8 bg-blue-700 rounded-md">
          <legend className="text-white text-3xl text-center font-bold w-full">
            Entrar
          </legend>
          <form
            method="POST"
            className="h-full w-full flex flex-col justify-center items-center gap-4">
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
              />
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
              />
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
