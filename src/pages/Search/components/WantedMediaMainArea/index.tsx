import { LoadingSmall, MediaItem } from '@/components';

import { IWantedMedia } from '@/types/IWantedMedia';

interface IProps {
  isWantedMediaOnError: boolean;
  isWantedMediaLoading: boolean;
  query: string;
  wantedMediaData: IWantedMedia[] | undefined;
}

export function WantedMediaMainArea({
  isWantedMediaLoading,
  isWantedMediaOnError,
  query,
  wantedMediaData,
}: IProps) {
  if (isWantedMediaLoading) {
    return <LoadingSmall />;
  }
  if (
    wantedMediaData === undefined ||
    isWantedMediaOnError ||
    (wantedMediaData.length === 0 &&
      query.trim() !== '' &&
      !isWantedMediaLoading)
  ) {
    return (
      <div className="col-span-full flex justify-center items-center">
        <span className="text-gray-500 text-center">
          Não foi possível encontrar a mídia informada.
        </span>
      </div>
    );
  }
  if (wantedMediaData.length === 0 && query.trim() === '') {
    return (
      <div className="col-span-full flex justify-center items-center">
        <span className="text-gray-500 text-center">
          Busque por suas séries os filmes aqui.
        </span>
      </div>
    );
  }

  return (
    <>
      {wantedMediaData.map((media) => (
        <MediaItem
          key={media.id}
          media_id={media.id}
          media_type={media.media_type as 'tv' | 'movie'}
          overview={media.overview}
          poster_path={media.poster_path}
        />
      ))}
    </>
  );
}
