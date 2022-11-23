import { tmdbRequest } from '.';

import { IWantedMedia } from '@/types/IWantedMedia';

function removePersonsFromWantedMedias(data: IWantedMedia[]) {
  let newData = data;
  newData = newData.filter((media) => media.media_type !== 'person');
  return newData;
}

export async function getWantedMedias(query: string): Promise<IWantedMedia[]> {
  let data = (
    await tmdbRequest(
      `/search/multi?page=1&query=${query}&include_adulte=false&`
    )
  ).results;
  data = removePersonsFromWantedMedias(data);
  return data;
}
