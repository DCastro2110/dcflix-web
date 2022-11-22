import { ButtonWithIcon } from '@/components';

import { ITrending } from '@/types/ITrending';

import { textCutter } from '@/utils/textCutter';
import { chooseAMainMedia } from '../../utils/chooseAMainMedia';

import { tmdbBetterImageLink } from '@/constants/tmdbImageLink';

interface IProps {
  data: ITrending[];
}

export function MainMedia({ data }: IProps) {
  const mainMedia = chooseAMainMedia(data);

  return (
    <main
      className="relative h-[80vh] bg-white/40 text-white bg-cover bg-center"
      style={{
        backgroundImage: `url('${tmdbBetterImageLink}${mainMedia.backdrop_path}')`,
      }}>
      <div className="absolute inset-0 bg-main-gradient-bottom">
        <div className="h-full container max-w-[1600px] flex items-center">
          <div className="space-y-4 md:-mt-24 ">
            <h1 className="font-bold text-4xl md:text-6xl">
              {mainMedia.title}
            </h1>

            <p className="max-w-md">{textCutter(mainMedia.overview)}</p>

            <div className="w-fit flex justify-center items-center mt-4 gap-4">
              <ButtonWithIcon template="watch" />
              <ButtonWithIcon template="about" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
