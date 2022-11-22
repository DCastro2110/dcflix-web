import { ITrending } from '@/types/ITrending';

export function chooseAMainMedia(data: ITrending[]) {
  const randomNumber = Math.floor(Math.random() * data.length);

  return data[randomNumber];
}
