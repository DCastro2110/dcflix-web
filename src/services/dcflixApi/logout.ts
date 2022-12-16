import { dcflixApi } from './index';

import { IDcflixApiJson } from '@/types/IDcflixApiJson';

export async function logout(): Promise<IDcflixApiJson<undefined>> {
  const res = await dcflixApi.get('/logout');
  const { data } = res;

  return data;
}
