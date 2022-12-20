import { dcflixApi } from '.';

import { IDcflixApiJson } from '@/types/IDcflixApiJson';

interface IBody {
  password: string;
  passwordConfirmation: string;
}

export async function changePassword(
  id: string,
  body: IBody
): Promise<IDcflixApiJson> {
  const req = await dcflixApi.patch(
    `/forgot-password/new-password/${id}`,
    body
  );

  return req.data as IDcflixApiJson;
}
