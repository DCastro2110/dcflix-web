import { dcflixApi } from '.';

import { IDcflixApiJson } from '@/types/IDcflixApiJson';

export async function removeMediaFromList(
  mediaId: string
): Promise<IDcflixApiJson> {
  const req = await dcflixApi.delete(`my-list/${mediaId}`);
  const { data } = req;

  return data as IDcflixApiJson;
}
