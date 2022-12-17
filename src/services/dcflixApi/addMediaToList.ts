import { dcflixApi } from '.';

import { IDcflixApiJson } from '@/types/IDcflixApiJson';

interface IBody {
  title: string;
  poster_path: string;
  media_type: 'movie' | 'tv';
}

export async function addMediaToList(
  mediaId: string,
  body: IBody
): Promise<IDcflixApiJson> {
  const req = await dcflixApi.post(`my-list/${mediaId}`, body);
  const { data } = req;

  return data as IDcflixApiJson;
}
