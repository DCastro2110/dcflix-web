import { MediaType } from "../types/MediaType";

export const mediaRemoverThatHasNoImages = (data: any) => {
  const newData = JSON.parse(JSON.stringify(data));
  
  if (newData.results) {
    const results: MediaType[] = newData.results;
    const resultsFilter = results.filter(
      (value) => value.poster_path && value.backdrop_path
    );
    newData.results = resultsFilter;
  }

  return newData;
};
