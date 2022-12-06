import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { Footer, Header, Loading, BlankScreen, Toast } from '@/components';
import { MainMedia, MediasByGenreSection } from './components';

import { getMediasByGenre } from '@/services/tmdbApi/getMediasByGenre';

import { filterTrendingMedias } from './utils/filterTrendingMedias';

export function Browse() {
  const allMediasRequest = useQuery({
    queryKey: ['allMedias'],
    queryFn: () => getMediasByGenre.allMediasRequest(),
    onError: () => {
      toast.error('Erro de conexão. Tente Novamente!');
    },
  });

  if (allMediasRequest.isLoading) {
    return <Loading />;
  }

  if (allMediasRequest.isError || allMediasRequest.data === undefined) {
    return <BlankScreen />;
  }

  return (
    <>
      <Toast />
      <Header />
      <MainMedia data={filterTrendingMedias(allMediasRequest.data)} />
      <section className="container max-w-[1600px] space-y-2 py-2">
        {allMediasRequest.data &&
          allMediasRequest.data.map((item) => (
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
