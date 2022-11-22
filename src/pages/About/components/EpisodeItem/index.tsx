import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export function EpisodeItem() {
  return (
    <div className="bg-blue-700 text-white rounded-md overflow-hidden hover:scale-105 transition-transform cursor-pointer">
      <LazyLoadImage
        src="/images/main-bg.jpeg"
        alt=""
      />
      <h2 className="p-2">1. Death by Misadventure</h2>
    </div>
  );
}
