import { tmdbRequest } from '.';

import { IMovieMedia } from '@/types/IMovieMedia';

export async function getAMovie(id: number): Promise<IMovieMedia> {
  const data = await tmdbRequest(`/movie/${id}?`);
  data.media_type = 'movie';
  return data;
}
