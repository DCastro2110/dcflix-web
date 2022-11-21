import { tmdbRequest } from '.';

import { IDefaultPattern } from '@/types/IDefaultPattern';

import { addMediaType } from '@/utils/addMediaType';

import { ITrending } from '@/types/ITrending';
import { ITvPopular } from '@/types/ITvPopular';
import { IMediaByGenre } from '@/types/IMediaByGnere';

export const getMediasByGenre = {
  allMediasRequest(): Array<() => void> {
    return [
      this.trendingRequest,
      this.tvPopularRequest,
      this.actionRequest,
      this.horrorRequest,
      this.dramaRequest,
      this.misteryRequest,
      this.romanceRequest,
      this.comedyRequest,
      this.documentaryRequest,
    ];
  },
  async trendingRequest() {
    const trendingMedias: IDefaultPattern<ITrending[]> = {
      slug: 'trending',
      title: 'Em alta',
      items: (await tmdbRequest('/trending/movie/day?')).results,
    };

    addMediaType(trendingMedias.items, 'movie');

    return trendingMedias;
  },

  async tvPopularRequest(page: string = '1') {
    const tvPopularMedias: IDefaultPattern<ITvPopular[]> = {
      slug: 'tv',
      title: 'Séries em Alta',
      items: (await tmdbRequest(`/tv/popular?&page=${page}&`)).results,
    };

    addMediaType(tvPopularMedias.items, 'tv');

    return tvPopularMedias;
  },

  async actionRequest(page: string = '1') {
    const actionMedias: IDefaultPattern<IMediaByGenre[]> = {
      slug: 'action',
      title: 'Ação',
      items: (await tmdbRequest(`/discover/movie?with_genres=28&page=${page}&`))
        .results,
    };

    addMediaType(actionMedias.items, 'movie');

    return actionMedias;
  },

  async horrorRequest(page: string = '1') {
    const horrorMedias: IDefaultPattern<IMediaByGenre[]> = {
      slug: 'horror',
      title: 'Terror',
      items: (await tmdbRequest(`/discover/movie?with_genres=27&page=${page}&`))
        .results,
    };

    addMediaType(horrorMedias.items, 'movie');

    return horrorMedias;
  },

  async dramaRequest(page: string = '1') {
    const dramaMedias: IDefaultPattern<IMediaByGenre[]> = {
      slug: 'drama',
      title: 'Drama',
      items: (await tmdbRequest(`/discover/movie?with_genres=18&page=${page}&`))
        .results,
    };

    addMediaType(dramaMedias.items, 'movie');

    return dramaMedias;
  },

  async misteryRequest(page: string = '1') {
    const misteryMedias: IDefaultPattern<IMediaByGenre[]> = {
      slug: 'mistery',
      title: 'Suspense',
      items: (
        await tmdbRequest(`/discover/movie?with_genres=9648&page=${page}&`)
      ).results,
    };

    addMediaType(misteryMedias.items, 'movie');

    return misteryMedias;
  },

  async romanceRequest(page: string = '1') {
    const romanceMedias: IDefaultPattern<IMediaByGenre[]> = {
      slug: 'romance',
      title: 'Romance',
      items: (
        await tmdbRequest(`/discover/movie?with_genres=10749&page=${page}&`)
      ).results,
    };

    addMediaType(romanceMedias.items, 'movie');

    return romanceMedias;
  },

  async comedyRequest(page: string = '1') {
    const comedyMedias: IDefaultPattern<IMediaByGenre[]> = {
      slug: 'comedy',
      title: 'Comédia',
      items: (await tmdbRequest(`/discover/movie?with_genres=35&page=${page}&`))
        .results,
    };

    addMediaType(comedyMedias.items, 'movie');

    return comedyMedias;
  },

  async documentaryRequest(page: string = '1') {
    const documentaryMedias: IDefaultPattern<IMediaByGenre[]> = {
      slug: 'documentary',
      title: 'Documentário',
      items: (
        await tmdbRequest(
          `/discover/movie?with_genres=99&page=${page}&include_adult=false&`
        )
      ).results,
    };

    addMediaType(documentaryMedias.items, 'movie');

    return documentaryMedias;
  },
};
