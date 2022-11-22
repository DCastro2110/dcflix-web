import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { cryptMediaParam } from '@/utils/cryptMediaParam';

import { tmdbImageLink } from '@/constants/tmdbImageLink';

interface IProps {
  media_id: number;
  media_type: 'tv' | 'movie';
  poster_path: string;
  overview: string;
}

export function MediaItem({
  media_id,
  media_type,
  poster_path,
  overview,
}: IProps) {
  return (
    <Link
      to={cryptMediaParam(media_id, media_type)}
      className="h-80 m-2 basis-52 shrink-0 bg-blue-700 rounded-md hover:scale-105 transition-transform">
      <LazyLoadImage
        className="object-cover h-full w-full"
        height="100%"
        width="100%"
        src={`${tmdbImageLink}/${poster_path}`}
        alt={overview || ''}
        effect="blur"
      />
    </Link>
  );
}
