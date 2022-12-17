import { dcflixApi } from '.';

import { IDcflixApiJson } from '@/types/IDcflixApiJson';

interface IData {
  id: number;
  title: string;
  poster_path: string;
  media_type: 'tv' | 'movie';
}

export async function getListOfMedias(): Promise<IDcflixApiJson<IData[]>> {
  const req = await dcflixApi.get('my-list');
  const { data } = req;

  return data as IDcflixApiJson<IData[]>;
}
