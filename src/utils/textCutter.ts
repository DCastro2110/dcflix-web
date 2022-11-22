export const textCutter = (text: string) => {
  if (text.length <= 200) return text;

  const newText = `${text.slice(0, 201)}...`;
  return newText;
};
