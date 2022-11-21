import { useQuery } from 'react-query';

import { Footer, Header } from '@/components';
import { MainMedia, MediasByGenreSection } from './components';

import { getMediasByGenre } from '@/services/tmdbApi/getMediasByGenre';

export function Home() {
  const allMedias = useQuery({
    queryKey: ['allMedias'],
    queryFn: () => getMediasByGenre.allMediasRequest(),
  });

  return (
    <>
      <Header />
      <MainMedia />
      <section className="container max-w-[1600px] space-y-2 py-2">
        {allMedias.data &&
          allMedias.data.map((item) => (
            <MediasByGenreSection
              key={item.slug}
              title={item.title}
              slug={item.slug}
              data={item.items}
            />
          ))}
      </section>
      <Footer />
    </>
  );
}
