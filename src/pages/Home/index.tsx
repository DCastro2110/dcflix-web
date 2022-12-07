import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <main className="min-h-screen max-h-screen">
      <div className="relative w-full flex items-center justify-center">
        <div className="absolute px-4 z-20 w-fit flex flex-col items-center">
          <img
            className="w-52"
            src="/images/logo.svg"
            alt="Logo da DCFlix"
          />
          <p className="-mt-3 text-white text-2xl text-center font-bold">
            Os momentos mais incríveis, você encontra aqui.
          </p>

          <div className="w-full mt-5 py-8 border-t border-white-500 space-y-2">
            <Link
              to="/signin"
              className="bg-yellow-500 hover:opacity-50 transition-opacity text-white p-2 rounded-md flex justify-center items-center gap-2">
              Entrar
            </Link>
            <Link
              to="/signup"
              className="bg-white/50 hover:opacity-50 transition-opacity text-white p-2 rounded-md flex justify-center items-center gap-2">
              Cadastrar-se
            </Link>
          </div>
        </div>
        <div className="absolute z-10 inset-0 bg-home-gradient-bottom" />
        <div className="absolute z-10 inset-0 bg-home-gradient-left" />
        <Carousel
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          showIndicators={false}
          autoPlay>
          <img
            className="object-cover max-h-screen min-h-screen"
            src="images/banner1.jpg"
            alt=""
          />
          <img
            className="object-cover  max-h-screen min-h-screen"
            src="images/banner2.jpg"
            alt=""
          />
          <img
            className="object-cover max-h-screen min-h-screen"
            src="images/banner3.jpg"
            alt=""
          />
        </Carousel>
      </div>
    </main>
  );
}
