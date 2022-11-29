import { IEpisode } from '@/types/IEpisode';
import { tmdbRequest } from '.';

export async function getAEpisode(
  id: string,
  seasonNumber: string,
  episodeNumber: string
): Promise<IEpisode> {
  const data = await tmdbRequest(
    `/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}?`
  );
  return data;
}
