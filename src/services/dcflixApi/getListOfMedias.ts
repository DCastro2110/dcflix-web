import { dcflixApi } from '.';

import { IDcflixApiJson } from '@/types/IDcflixApiJson';

interface IData {
  medias: {
    id: number;
    title: string;
    poster_path: string;
    media_type: 'tv' | 'movie';
    overview: string;
  }[];
}

export async function getListOfMedias(): Promise<IDcflixApiJson<IData>> {
  const req = await dcflixApi.get('my-list');
  const { data } = req;

  return data as IDcflixApiJson<IData>;
}
