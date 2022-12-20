import { dcflixApi } from '.';

import { IDcflixApiJson } from '@/types/IDcflixApiJson';

export async function verifyIfUrlIdIsValid(
  id: string
): Promise<IDcflixApiJson> {
  const req = await dcflixApi.get(`/forgot-password/new-password/${id}`);

  return req.data as IDcflixApiJson;
}
