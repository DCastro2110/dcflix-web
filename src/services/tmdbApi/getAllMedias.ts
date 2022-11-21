import { getMediasByGenre } from './getMediasByGenre';

export const getAllMedias = async () => {
  const allMedias = await Promise.all(getMediasByGenre.allMediasRequest());
  return allMedias;
};
