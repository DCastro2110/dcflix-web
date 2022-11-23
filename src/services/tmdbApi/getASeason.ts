import { tmdbRequest } from '.';

import { ISeason } from '@/types/ISeason';

export async function getASeason(
  tvId: string,
  seasonNumber: number
): Promise<ISeason> {
  const data = await tmdbRequest(`/tv/${tvId}/season/${seasonNumber}?`);
  return data;
}
