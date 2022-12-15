import {
  createContext,
  Dispatch,
  ReactNode,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { IUser } from '@/types/IUser';

interface IAuthContext {
  user: IUser;
  setUser: Dispatch<IUser>;
}

export const AuthContext = createContext({} as IAuthContext);
export function AuthContextProvider({ children }: { children: ReactNode }) {
  const navigation = useNavigate();
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

  useEffect(() => {
    if (user.id) {
      navigation('/browse');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
}
