/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'phosphor-react';

import { IconButton, Loading } from '@/components';

import { getAMovie } from '@/services/tmdbApi/getAMovie';
import { getATv } from '@/services/tmdbApi/getATv';
import { getAEpisode } from '@/services/tmdbApi/getAEpisode';

import { IMovieMedia } from '@/types/IMovieMedia';
import { ITvMedia } from '@/types/ITvMedia';

import { decryptMediaParam } from '@/utils/decryptMediaParam';

import { tmdbBetterImageLink } from '@/constants/tmdbImageLink';

function getMedia(
  type: 'tv' | 'movie',
  id: string
): Promise<ITvMedia> | Promise<IMovieMedia> {
  if (type === 'tv') {
    return getATv(Number(id));
  }
  return getAMovie(Number(id));
}

export function Play() {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const [mediaId, mediaType] = decryptMediaParam(id as string);

  useEffect(() => {
    if (
      mediaType === 'tv' &&
      !(searchParams.get('season') && searchParams.get('episode'))
    ) {
      navigate(`/about/${id}`);
    }
  }, []);

  const mediaRequest = useQuery<ITvMedia | IMovieMedia>({
    queryKey: [`media-${mediaType}`, mediaId],
    queryFn: () => getMedia(mediaType as 'tv' | 'movie', mediaId),
    onError: () => {
      toast.error(
        'Não foi carregar as informações requisitadas. Tente novamente!'
      );
      navigate(`/about/${id}`);
    },
  });

  const episodeRequest = useQuery({
    queryKey: [
      'episode',
      mediaId + searchParams.get('season') + searchParams.get('episode'),
    ],
    queryFn: () => {
      return getAEpisode(
        mediaId,
        searchParams.get('season') as string,
        searchParams.get('episode') as string
      );
    },
    onError: () => {
      toast.error(
        'Não foi carregar as informações requisitadas. Tente novamente!'
      );
      navigate(`/about/${id}`);
    },
    enabled: !!searchParams.get('season') && !!searchParams.get('episode'),
  });

  if (
    mediaRequest.isLoading ||
    mediaRequest.data === undefined ||
    episodeRequest.isLoading ||
    (episodeRequest.isFetched && episodeRequest.data === undefined)
  ) {
    return <Loading />;
  }

  return (
    <div className="container h-screen max-w-[1200px] flex justify-center items-center">
      <main className="relative h-full flex items-center justify-center bg-black">
        <div className="absolute z-10 top-0 right-0 left-0 py-4 px-2 border-b border-white flex items-center justify-between text-white">
          <div className="w-24 h-full flex items-center">
            <IconButton
              title="Voltar"
              onClick={() => navigate(`/about/${id}`)}>
              <ArrowLeft
                className="text-white"
                size={24}
              />
            </IconButton>
          </div>
          <h1 className="text-center">
            {mediaType === 'tv'
              ? `${episodeRequest.data?.episode_number}. ${episodeRequest.data?.name}`
              : mediaRequest.data?.title}
          </h1>
          <div className="h-full w-24" />
        </div>
        <video
          src="/videos/video.mp4"
          poster={`${tmdbBetterImageLink}${
            episodeRequest.data?.still_path || mediaRequest.data.backdrop_path
          }`}
          controls
        />
      </main>
    </div>
  );
}
