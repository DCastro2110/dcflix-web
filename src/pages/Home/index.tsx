/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useEffect, useRef, useState } from 'react';

export function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [selectedSlide, setSelectedSlide] = useState(1);

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        setSelectedSlide((prevState) => {
          if (prevState <= 1) return 1;
          return prevState - 1;
        });
      }

      if (e.key === 'ArrowRight') {
        setSelectedSlide((prevState) => {
          if (prevState >= 3) return 3;
          return prevState + 1;
        });
      }
    });
  }, []);

  useEffect(() => {
    if (!container.current) return;
    const slide = container.current as HTMLDivElement;

    if (selectedSlide === 1) {
      slide.style.transform = 'translateX(0)';
    }

    if (selectedSlide === 2) {
      slide.style.transform = 'translateX(-10vw)';
    }

    if (selectedSlide === 3) {
      slide.style.transform = 'translateX(-200vw)';
    }
  }, [selectedSlide]);

  return (
    <main className="min-h-screen max-h-screen flex items-center justify-center">
      <div
        className="absolute -z-10 inset-0 flex h-full w-full overflow-x-hidden"
        ref={container}>
        <div ref={container}>
          <img
            className="min-w-[100vw] h-full object-cover object-center"
            src="/images/banner1.jpg"
            alt=""
          />
          <img
            className="min-w-[100vw] h-full object-cover object-center"
            src="/images/banner2.jpg"
            alt=""
          />
          <img
            className="min-w-[100vw] h-full object-cover object-center"
            src="/images/banner3.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="relative container max-w-[1600px] min-h-screen space-y-2 py-2 flex flex-col">
        <div className="w-fit absolute bottom-10 self-center flex gap-2">
          <div
            className={`w-4 h-4 rounded-full ${
              selectedSlide === 1 ? 'bg-yellow-500' : 'bg-white/50'
            }`}
            role="button"
            aria-label="Trocar slide"
            onClick={() => setSelectedSlide(1)}
          />
          <div
            className={`w-4 h-4 rounded-full ${
              selectedSlide === 2 ? 'bg-yellow-500' : 'bg-white/50'
            }`}
            role="button"
            aria-label="Trocar slide"
            onClick={() => setSelectedSlide(2)}
          />
          <div
            className={`w-4 h-4 rounded-full ${
              selectedSlide === 3 ? 'bg-yellow-500' : 'bg-white/50'
            }`}
            role="button"
            aria-label="Trocar slide"
            onClick={() => setSelectedSlide(3)}
          />
        </div>
      </div>
    </main>
  );
}
