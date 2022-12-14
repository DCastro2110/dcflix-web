import { createContext, Dispatch, ReactNode, useState } from 'react';

import { IUser } from '@/types/IUser';

interface IAuthContext {
  user: IUser;
  setUser: Dispatch<IUser>;
}

export const authContext = createContext({} as IAuthContext);
export const authContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser>({
    id: '',
    email: '',
    name: '',
  });

  return (
    <authContext.Provider
      value={{
        user,
        setUser,
      }}>
      {children}
    </authContext.Provider>
  );
};
