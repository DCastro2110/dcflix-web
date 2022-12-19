import { dcflixApi } from '.';

import { IDcflixApiJson } from '@/types/IDcflixApiJson';

interface IBody {
  email: string;
}

export async function getLinkToRecoverPassword(
  data: IBody
): Promise<IDcflixApiJson> {
  const req = await dcflixApi.post('/forgot-password/get-link', data);

  return req.data as IDcflixApiJson;
}
