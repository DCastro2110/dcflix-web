import { IMediaByGenre } from '@/types/IMediaByGenre';
import { ITrending } from '@/types/ITrending';
import { ITvPopular } from '@/types/ITvPopular';

type TItems = IMediaByGenre[] | ITrending[] | ITvPopular[];

export const addMediaType = (items: TItems, type: 'tv' | 'movie') => {
  items.forEach((item) => {
    const media = item;
    media.media_type = type;
  });
};
