export function MediaItem() {
  return (
    <button
      className="h-92 m-2 basis-52 shrink-0 bg-red-500 rounded-md hover:scale-105 transition-transform"
      type="button">
      <img
        className="object-cover h-full w-full"
        src="https://image.tmdb.org/t/p/w300/4x3pt6hoLblBeHebUa4OyiVXFiM.jpg"
        alt=""
      />
    </button>
  );
}
