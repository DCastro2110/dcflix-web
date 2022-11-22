import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { Footer, Header, Loading, Toast } from '@/components';
import { MainMedia, MediasByGenreSection } from './components';

import { getMediasByGenre } from '@/services/tmdbApi/getMediasByGenre';

import { filterTrendingMedias } from './utils/filterTrendingMedias';

export function Home() {
  const allMedias = useQuery({
    queryKey: ['allMedias'],
    queryFn: () => getMediasByGenre.allMediasRequest(),
    onError: () => {
      toast.error('Erro de conexão. Tente Novamente!');
    },
  });

  if (allMedias.isLoading) {
    return <Loading />;
  }

  if (allMedias.isError || allMedias.data === undefined) {
    return <div>Não foi possível recarregar</div>;
  }

  return (
    <>
      <Toast />
      <Header />
      <MainMedia data={filterTrendingMedias(allMedias.data)} />
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
