import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { ButtonWithIcon } from '@/components';

import { ITrending } from '@/types/ITrending';

import { textCutter } from '@/utils/textCutter';
import { chooseAMainMedia } from '../../utils/chooseAMainMedia';
import { cryptMediaParam } from '@/utils/cryptMediaParam';

import { tmdbBetterImageLink } from '@/constants/tmdbImageLink';

interface IProps {
  data: ITrending[];
}

export function MainMedia({ data }: IProps) {
  const mainMedia = useMemo(() => chooseAMainMedia(data), []);
  const navigate = useNavigate();

  return (
    <main className="relative h-[90vh] bg-blue-800 text-white bg-cover bg-center">
      <LazyLoadImage
        className="max-h-full min-h-full w-full object-cover absolute inset-0"
        src={tmdbBetterImageLink + mainMedia.backdrop_path}
        alt=""
        effect="opacity"
      />
      <div className="absolute inset-0 bg-main-gradient-bottom">
        <div className="h-full container max-w-[1600px] flex items-center">
          <div className="space-y-4 md:-mt-24 ">
            <h1 className="font-bold text-4xl md:text-6xl">
              {mainMedia.title}
            </h1>

            <p className="max-w-md">{textCutter(mainMedia.overview)}</p>

            <div className="w-fit flex justify-center items-center mt-4 gap-4">
              <ButtonWithIcon
                template="watch"
                onClick={() => navigate('/browse')}
              />
              <ButtonWithIcon
                template="about"
                onClick={() =>
                  navigate(
                    `/about/${cryptMediaParam(
                      mainMedia.id,
                      mainMedia.media_type
                    )}`
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
