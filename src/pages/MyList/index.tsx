import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Header, MediaItem, Footer, Loading } from '@/components';

import { getListOfMedias } from '@/services/dcflixApi/getListOfMedias';

export function MyList() {
  const userListOfMediasRequest = useQuery({
    queryKey: ['user-medias-list'],
    queryFn: getListOfMedias,
  });

  if (userListOfMediasRequest.isLoading) {
    return <Loading />;
  }

  if (
    userListOfMediasRequest.data === undefined ||
    userListOfMediasRequest.isError
  ) {
    toast.error('Não foi possível carregar as mídias na sua lista.');
    return <Navigate to="/browse" />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header
        layout="categories"
        pageTitle="Minha Lista"
      />
      <main className="pt-40 flex-1 flex flex-col justify-center items-center">
        <div className="container max-w-[1600px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {userListOfMediasRequest.data.data.medias.length === 0 ? (
            <div className="col-span-full min-h-full flex justify-center items-center">
              <span className="text-gray-500 text-center">
                Você não adicionou nenhuma mídia <br /> à sua lista de desejo.
              </span>
            </div>
          ) : (
            userListOfMediasRequest.data.data.medias.map((media) => (
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
      </main>
      <Footer />
    </div>
  );
}
