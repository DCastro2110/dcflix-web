import axios from 'axios';

import { removeMediaThatHasNoImage } from '@/utils/removeMediaThatHasNoImage';

export const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 20000,
  timeoutErrorMessage:
    'Tempo de requisição esgotado. Tente novamente mais tarde!',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

export const tmdbRequest = async (url: string) => {
  const res = await tmdbApi.get(`${url}`);
  const data = removeMediaThatHasNoImage(res.data);

  return data;
};
