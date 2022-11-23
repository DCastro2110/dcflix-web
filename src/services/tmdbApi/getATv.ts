import { tmdbRequest } from '.';

import { ITvMedia } from '@/types/ITvMedia';

export async function getATv(id: number): Promise<ITvMedia> {
  const data = await tmdbRequest(`/tv/${id}?`);
  data.media_type = 'tv';
  return data;
}
