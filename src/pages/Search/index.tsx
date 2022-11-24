import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { Footer, Header, Toast } from '@/components';
import { MainArea } from './components/MainArea';

import { getWantedMedias } from '@/services/tmdbApi/getWantedMedias';

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams('q');
  const [query, setQuery] = useState(() => {
    const qParam = searchParams.get('q');
    return qParam || '';
  });

  const wantedMediaRequest = useQuery({
    queryKey: ['search', query],
    queryFn: () => getWantedMedias(query),
    onError: () => toast.error('Erro de conexão. Tente novamente!'),
    enabled: !!query,
    initialData: [],
  });

  useEffect(() => {
    setSearchParams({ q: query });
  }, [query]);

  return (
    <>
      <Toast />
      <div className="min-h-screen flex flex-col justify-between">
        <Header
          query={{ query, setQuery }}
          layout="search"
        />
        <main className="pt-40 flex-1 flex justify-center items-center">
          <div className="relative container max-w-[1600px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <MainArea
              query={query}
              wantedMediaData={wantedMediaRequest.data}
              isWantedMediaLoading={wantedMediaRequest.isLoading}
              isWantedMediaOnError={wantedMediaRequest.isError}
            />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
