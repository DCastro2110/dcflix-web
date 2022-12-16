import { dcflixApi } from '.';

import { IDcflixApiJson } from '@/types/IDcflixApiJson';
import { IUser } from '@/types/IUser';

interface IData {
  user: IUser;
}

export async function me(): Promise<IDcflixApiJson<IData>> {
  const res = await dcflixApi.get('/me');

  return res.data as IDcflixApiJson<IData>;
}
