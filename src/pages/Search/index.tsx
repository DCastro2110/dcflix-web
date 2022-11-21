import { Header, MediaItem } from '@/components';

export function Search() {
  return (
    <div>
      <Header layout="search" />
      <main className="pt-40">
        <div className="container max-w-[1600px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
          <MediaItem />
        </div>
      </main>
    </div>
  );
}
