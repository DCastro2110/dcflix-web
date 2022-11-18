import { Footer, Header } from '@/components';
import { MainMedia, MediasByGenreSection } from './components';

export function Home() {
  return (
    <>
      <Header />
      <MainMedia />
      <section className="container max-w-[1600px] space-y-2 py-2">
        <MediasByGenreSection />
        <MediasByGenreSection />
      </section>
      <Footer />
    </>
  );
}
