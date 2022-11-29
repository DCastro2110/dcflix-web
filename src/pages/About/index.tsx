import { useCallback, useMemo, useState } from 'react';
import { ArrowLeft } from 'phosphor-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';

import {
  Header,
  IconButton,
  ButtonWithIcon,
  Footer,
  Loading,
  Toast,
  LoadingSmall,
  BlankScreen,
} from '@/components';
import { SelectSeason, EpisodeItem } from './components';

import { getATv } from '@/services/tmdbApi/getATv';
import { getAMovie } from '@/services/tmdbApi/getAMovie';
import { getASeason } from '@/services/tmdbApi/getASeason';

import { ITvMedia } from '@/types/ITvMedia';
import { IMovieMedia } from '@/types/IMovieMedia';

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

export function About() {
  const [seasonSelected, setSeasonSelected] = useState(1);

  const navigate = useNavigate();
  const { id } = useParams();

  const [mediaId, mediaType] = decryptMediaParam(id as string);

  const mediaRequest = useQuery<ITvMedia | IMovieMedia>({
    queryKey: [`media-${mediaType}`, mediaId],
    queryFn: () => getMedia(mediaType as 'tv' | 'movie', mediaId),
    onError: () =>
      toast.error(
        'Não foi carregar as informações requisitadas. Tente novamente!'
      ),
  });
  const seasonRequest = useQuery({
    queryKey: [`season`, `${mediaId}-${seasonSelected}`],
    queryFn: () => getASeason(mediaId, seasonSelected),
    onError: () =>
      toast.error(
        'Não foi carregar as informações requisitadas. Tente novamente!'
      ),
    enabled: mediaType === 'tv',
  });

  const seasons = useMemo(() => {
    if (
      mediaRequest?.data?.media_type === 'tv' &&
      mediaRequest?.data?.seasons
    ) {
      const seasonsOptions = mediaRequest.data.seasons
        .map((season) => ({
          value: season.name,
          label: `Temporada ${season.season_number}`,
        }))
        .filter((item) => item.label !== 'Temporada 0');

      return seasonsOptions;
    }
    return null;
  }, [mediaRequest.data]);

  const navigation = useCallback(() => {
    if (mediaType === 'tv') {
      return navigate(`/play/${id}?season=1&episode=1`);
    }
    return navigate(`/play/${id}`);
  }, []);

  if (mediaRequest.isLoading) {
    return <Loading />;
  }

  if (mediaRequest.data === undefined || mediaRequest.isError) {
    return <BlankScreen />;
  }

  return (
    <>
      <Toast />
      <Header />
      <main
        className="relative min-h-screen bg-cover text-white"
        style={{
          backgroundImage: `url(${tmdbBetterImageLink}${mediaRequest.data.backdrop_path})`,
        }}>
        <div className="min-h-screen h-full bg-main-gradient-bottom">
          <div className="container max-w-[1600px] pt-24">
            <div className="flex flex-col gap-4">
              <IconButton handleClick={() => navigate('/browse')}>
                <ArrowLeft
                  color="white"
                  size={32}
                />
              </IconButton>

              <h1 className="font-bold text-4xl md:text-6xl max-w-md">
                {mediaRequest.data?.original_name ||
                  mediaRequest.data?.original_title}
              </h1>
              <p className="max-w-md">{mediaRequest.data.overview}</p>

              <div className="w-fit mt-4 space-y-4">
                <div className="flex items-center gap-4">
                  <ButtonWithIcon
                    template="watch"
                    onClick={navigation}
                  />
                  <ButtonWithIcon template="addToMyList" />
                </div>
                {mediaType === 'tv' && seasons && (
                  <SelectSeason
                    seasonSelector={{ seasonSelected, setSeasonSelected }}
                    seasonOptions={seasons}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      {mediaType === 'tv' && (
        <section>
          <div className="relative container max-w-[1600px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {seasonRequest.isLoading ? (
              <LoadingSmall />
            ) : (
              seasonRequest.data?.episodes.map((episode) => (
                <EpisodeItem
                  url={`/play/${id}?season=${episode.season_number}&episode=${episode.episode_number}`}
                  stillPath={
                    episode.still_path || mediaRequest.data.backdrop_path
                  }
                  episodeName={episode.name}
                  episodeNumber={episode.episode_number}
                />
              ))
            )}
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}
