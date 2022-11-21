import { Link } from 'react-router-dom';

import { tmdbImageLink } from '@/constants/tmdbImageLink';

interface IProps {
  media_id: number;
  media_type: string;
  poster_path: string;
}

export function MediaItem({ media_id, media_type, poster_path }: IProps) {
  return (
    <Link
      to="/browse"
      className="h-80 m-2 basis-52 shrink-0 bg-red-500 rounded-md hover:scale-105 transition-transform">
      <img
        className="object-cover h-full w-full"
        src={`${tmdbImageLink}/${poster_path}`}
        alt=""
      />
    </Link>
  );
}
