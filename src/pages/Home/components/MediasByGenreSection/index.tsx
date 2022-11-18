/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useRef } from 'react';
import { CaretLeft, CaretRight } from 'phosphor-react';

import { MediaItem } from '@/components';

import {
  quantToScrollToLeft,
  quantToScrollToRight,
} from '../../utils/scrollToBordersOfSection';

export function MediasByGenreSection() {
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

  const handleScrollToLeft = () => {
    if (!mediasContainer?.current) return;

    const containerWithMedias = mediasContainer.current as HTMLDivElement;

    containerWithMedias.scrollTo({
      left: quantToScrollToLeft(containerWithMedias),
      behavior: 'smooth',
    });
  };

  const handleScrollToRight = () => {
    if (!mediasContainer?.current) return;

    const containerWithMedias = mediasContainer.current as HTMLDivElement;

    containerWithMedias.scrollTo({
      left: quantToScrollToRight(containerWithMedias),
      behavior: 'smooth',
    });
  };

  return (
    <div className="max-w-full p-2 space-y-2">
      <h2 className="text-xl mx-2 text-white">Em alta</h2>
      <div className="relative h-fit">
        <div
          className={`absolute z-10 h-60 top-2 w-12 items-center justify-center bg-black/50 ${
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
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
        </div>
        <div
          className={`absolute z-10 h-60 top-2 right-0 w-12 items-center justify-center bg-black/50 ${
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
