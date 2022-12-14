import { dcflixApi } from '.';

import { IDcflixApiJson } from '@/types/IDcflixApiJson';
import { IUser } from '@/types/IUser';

interface ILoginCrendetials {
  email: string;
  password: string;
}

interface IData {
  token: string;
  user: IUser;
}

export async function login(
  data: ILoginCrendetials
): Promise<IDcflixApiJson<IData>> {
  const req = await dcflixApi.get('/login', {
    auth: {
      username: data.email,
      password: data.password,
    },
  });

  return req.data as IDcflixApiJson<IData>;
}
