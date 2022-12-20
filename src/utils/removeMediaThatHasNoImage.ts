export const removeMediaThatHasNoImage = (data: any) => {
  const newData = JSON.parse(JSON.stringify(data));

  if (newData.results) {
    const { results } = newData;
    const resultsFilter = results.filter(
      (value: any) => value.poster_path && value.backdrop_path
    );
    newData.results = resultsFilter;
  }

  return newData;
};
