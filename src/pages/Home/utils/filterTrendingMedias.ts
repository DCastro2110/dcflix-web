import { IDefaultPattern } from '@/types/IDefaultPattern';
import { IMediaByGenre } from '@/types/IMediaByGenre';
import { ITrending } from '@/types/ITrending';
import { ITvPopular } from '@/types/ITvPopular';

type TItems = IMediaByGenre[] | ITrending[] | ITvPopular[];

export function filterTrendingMedias(data: Array<IDefaultPattern<TItems>>) {
  const [trendingMedias] = data.filter(
    (mediasByGenre) => mediasByGenre.slug === 'trending'
  );

  return trendingMedias.items;
}
