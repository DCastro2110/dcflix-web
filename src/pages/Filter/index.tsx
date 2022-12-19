import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { toast } from 'react-toastify';

import { Header, MediaItem, Footer, LoadingSmall, Toast } from '@/components';

import { getTitleBySlug } from './utils/getTitleBySlug';
import { getRequestFunctionBySlug } from './utils/getRequestFunctionBySlug';

import { TSlug } from '@/types/TSlug';

export function Filter() {
  const { slug } = useParams();

  const getMediasByCategory = async (pageParam: number) => {
    const data = await getRequestFunctionBySlug(slug as TSlug)(pageParam);
    return data;
  };

  const mediasByCategoryRequest = useInfiniteQuery({
    queryKey: ['categories', slug],
    queryFn: ({ pageParam = 1 }) => getMediasByCategory(pageParam),
    getNextPageParam: (lastPage, allPages) => allPages,
    onError: () =>
      toast.error(
        'Não foi possível carregar as informações requisitadas.\nTente novamente! '
      ),
  });

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const { body } = document;

      if (mediasByCategoryRequest.isFetchingNextPage) return;

      if (window.scrollY >= body.scrollHeight - 1000) {
        mediasByCategoryRequest.fetchNextPage();
      }
    });
  }, []);

  if (mediasByCategoryRequest.data === undefined) {
    return <div>Error</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Toast />
      <Header
        layout="categories"
        pageTitle={getTitleBySlug(slug as TSlug)}
      />
      <main className="pt-40 flex-1 flex flex-col justify-center items-center">
        <div className="container max-w-[1600px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {mediasByCategoryRequest.data.pages.map((page) =>
            page.items.map((media) => (
              <MediaItem
                key={media.id}
                media_id={media.id}
                media_type={media.media_type}
                overview={media.overview}
                poster_path={media.poster_path}
              />
            ))
          )}
        </div>
        {mediasByCategoryRequest.isFetchingNextPage && (
          <div className="relative h-96 w-full flex items-center justify-center">
            <LoadingSmall />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
