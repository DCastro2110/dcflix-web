export const textCutter = (text: string) => {
  if (text.length <= 200) return text;
  return text.slice(0, 201) + ' ...'
}