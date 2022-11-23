import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { tmdbImageLink } from '@/constants/tmdbImageLink';

interface IProps {
  stillPath: string;
  episodeNumber: number;
  episodeName: string;
}

export function EpisodeItem({ stillPath, episodeNumber, episodeName }: IProps) {
  return (
    <div className="bg-blue-700 text-white rounded-md overflow-hidden hover:scale-105 transition-transform cursor-pointer">
      <LazyLoadImage
        className="w-full object-cover"
        src={`${tmdbImageLink}${stillPath}`}
        alt=""
      />
      <h2 className="p-2">{`${episodeNumber}. ${episodeName}`}</h2>
    </div>
  );
}
