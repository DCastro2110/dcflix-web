import { ArrowLeft } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

import { Header, IconButton, ButtonWithIcon, Footer } from '@/components';
import { SelectSeason, EpisodeItem } from './components';

export function About() {
  const navigate = useNavigate();

  const typeOfMedia = 'tv';

  const seasonOptions = [
    { value: 'season1', label: 'Temporada 1' },
    { value: 'season2', label: 'Temporada 2' },
  ];

  return (
    <>
      <Header />
      <main className="relative h-screen bg-cover bg-[url('images/main-bg.jpeg')] text-white">
        <div className="absolute inset-0 bg-main-gradient-bottom">
          <div className="container max-w-[1600px] pt-24">
            <div className="flex flex-col gap-4">
              <IconButton handleClick={() => navigate('/browse')}>
                <ArrowLeft
                  color="white"
                  size={32}
                />
              </IconButton>

              <h1 className="font-bold text-4xl md:text-6xl">Chucky</h1>
              <p className="max-w-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                laborum facere, magni asperiores, debitis voluptas
                exercitationem sapiente itaque omnis provident nulla tempore
                deleniti fugiat earum at illo velit iure voluptatem!
              </p>

              <div className="w-fit mt-4 space-y-4">
                <div className="flex items-center gap-4">
                  <ButtonWithIcon template="watch" />
                  <ButtonWithIcon template="addToMyList" />
                </div>
                {typeOfMedia === 'tv' && (
                  <SelectSeason seasonOptions={seasonOptions} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      {typeOfMedia === 'tv' && (
        <section>
          <div className="container max-w-[1600px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
            <EpisodeItem />
            <EpisodeItem />
            <EpisodeItem />
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}
