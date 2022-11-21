/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { CaretLeft, CaretRight } from 'phosphor-react';

import { MediaItem } from '@/components';

import { ITrending } from '@/types/ITrending';
import { ITvPopular } from '@/types/ITvPopular';
import { IMediaByGenre } from '@/types/IMediaByGenre';

import {
  quantToScrollToLeft,
  quantToScrollToRight,
} from '../../utils/scrollToBordersOfSection';

interface IProps {
  data: ITrending[] | ITvPopular[] | IMediaByGenre[];
  slug: string;
  title: string;
}

export function MediasByGenreSection({ data, slug, title }: IProps) {
  const mediasContainer = useRef(null);
  const [showCaretButtons, setShowCaretButtons] = useState({
    left: false,
    right: true,
  });

  const handleContainerScroll = () => {
    if (!mediasContainer?.current) return;

    const containerWithMedias = mediasContainer.current as HTMLDivElement;

    setShowCaretButtons({
      left: true,
      right: true,
    });

    if (containerWithMedias.scrollLeft <= 50) {
      setShowCaretButtons((prevState) => ({
        ...prevState,
        left: false,
      }));
    }

    if (
      containerWithMedias.scrollWidth -
        containerWithMedias.getBoundingClientRect().width -
        50 <=
      containerWithMedias.scrollLeft
    ) {
      setShowCaretButtons((prevState) => ({
        ...prevState,
        right: false,
      }));
    }
  };

  const handleScrollToLeft = useCallback(() => {
    if (!mediasContainer?.current) return;

    const containerWithMedias = mediasContainer.current as HTMLDivElement;

    containerWithMedias.scrollTo({
      left: quantToScrollToLeft(containerWithMedias),
      behavior: 'smooth',
    });
  }, []);

  const handleScrollToRight = useCallback(() => {
    if (!mediasContainer?.current) return;

    const containerWithMedias = mediasContainer.current as HTMLDivElement;

    containerWithMedias.scrollTo({
      left: quantToScrollToRight(containerWithMedias),
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="max-w-full p-2 space-y-2">
      <h2 className="text-xl mx-2 text-white flex items-center">
        {title}
        <Link
          to="/"
          className="relative top-[1.6px] h-full text-sm ml-2 hover:text-yellow-500 transition-colors">
          {' '}
          {'>'} Ver mais
        </Link>
      </h2>
      <div className="relative h-fit">
        <div
          className={`absolute z-10 h-80 top-2 w-12 items-center justify-center bg-black/50 ${
            showCaretButtons.left ? 'flex' : 'hidden'
          }`}
          role="button"
          tabIndex={0}
          onClick={handleScrollToLeft}>
          <CaretLeft
            className="text-white"
            size={24}
          />
        </div>
        <div
          className="flex gap-2 overflow-x-scroll scrollbar-hide"
          onScroll={handleContainerScroll}
          ref={mediasContainer}>
          {data.map((media) => (
            <MediaItem
              media_id={media.id}
              media_type={media.media_type}
              poster_path={media.poster_path}
            />
          ))}
        </div>
        <div
          className={`absolute z-10 h-80 top-2 right-0 w-12 items-center justify-center bg-black/50 ${
            showCaretButtons.right ? 'flex' : 'hidden'
          }`}
          role="button"
          tabIndex={0}
          onClick={handleScrollToRight}>
          <CaretRight
            className="text-white"
            size={24}
          />
        </div>
      </div>
    </div>
  );
}
