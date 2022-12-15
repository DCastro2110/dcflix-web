import { createContext, Dispatch, ReactNode, useMemo, useState } from 'react';

import { IUser } from '@/types/IUser';

interface IAuthContext {
  user: IUser;
  setUser: Dispatch<IUser>;
}

export const AuthContext = createContext({} as IAuthContext);
export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser>({
    id: '',
    email: '',
    name: '',
  });

  const contextValues = useMemo(() => {
    return {
      user,
      setUser,
    };
  }, [user]);

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
}
