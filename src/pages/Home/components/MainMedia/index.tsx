import { ButtonWithIcon } from '@/components';

export function MainMedia() {
  return (
    <main
      className={`relative h-[80vh] bg-white/40 text-white bg-cover bg-center bg-[url('/images/main-bg.jpeg')]`}>
      <div className="absolute inset-0 bg-main-gradient-bottom">
        <div className="h-full container max-w-[1600px] flex items-center">
          <div className="space-y-4 -mt-24 ">
            <h1 className="font-bold text-6xl">The Wonder</h1>

            <p className="max-w-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At iusto
              facilis necessitatibus repellendus tenetur deserunt adipisci ad
              amet distinctio error voluptas, fugit, ducimus non est recusandae
              sapiente, sint itaque. Reprehenderit?
            </p>

            <div className="w-fit flex justify-center items-center gap-4">
              <ButtonWithIcon template="watch" />
              <ButtonWithIcon template="about" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
