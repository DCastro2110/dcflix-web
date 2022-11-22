export function criptMediaParam(id: number, type: 'tv' | 'movie') {
  let param = String(id);

  if (type === 'tv') {
    param += `_${2022}`;
  } else {
    param += `_${13152295}`;
  }

  return param;
}
