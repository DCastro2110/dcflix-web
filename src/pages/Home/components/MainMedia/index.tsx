import { ButtonWithIcon } from '@/components';

export function MainMedia() {
  return (
    <main className="h-[80vh] bg-white/40 text-white">
      <div className="container max-w-[1600px] pt-32">
        <div className="space-y-4">
          <h1 className="font-bold text-4xl md:text-6xl">The Wonder</h1>
          <p className="max-w-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At iusto
            facilis necessitatibus repellendus tenetur deserunt adipisci ad amet
            distinctio error voluptas, fugit, ducimus non est recusandae
            sapiente, sint itaque. Reprehenderit?
          </p>

          <div className="w-fit flex justify-center items-center gap-4">
            <ButtonWithIcon template="watch" />
            <ButtonWithIcon template="about" />
          </div>
        </div>
      </div>
    </main>
  );
}
