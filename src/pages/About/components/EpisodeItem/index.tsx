import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { tmdbImageLink } from '@/constants/tmdbImageLink';

interface IProps {
  episodeNumber: number;
  episodeName: string;
  stillPath: string;
  url: string;
}

export function EpisodeItem({
  stillPath,
  episodeNumber,
  episodeName,
  url,
}: IProps) {
  return (
    <Link
      to={url}
      className="bg-blue-700 text-white rounded-md overflow-hidden hover:scale-105 transition-transform cursor-pointer">
      <LazyLoadImage
        className="w-full object-cover"
        src={`${tmdbImageLink}${stillPath}`}
        alt=""
      />
      <h2 className="p-2">{`${episodeNumber}. ${episodeName}`}</h2>
    </Link>
  );
}
