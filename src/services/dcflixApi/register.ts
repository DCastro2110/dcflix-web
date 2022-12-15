import { dcflixApi } from '.';

import { IDcflixApiJson } from '@/types/IDcflixApiJson';
import { IUser } from '@/types/IUser';

interface IRegisterCrendetials {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
}

interface IData {
  token: string;
  user: IUser;
}

export async function register(
  data: IRegisterCrendetials
): Promise<IDcflixApiJson<IData>> {
  const req = await dcflixApi.post('/users', data);

  return req.data as IDcflixApiJson<IData>;
}
