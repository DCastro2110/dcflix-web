export function decriptMediaParam(param: string) {
  const [id, typeEncrypted] = param.split('_');

  let typeDecrypted;

  if (typeEncrypted === '13152295') {
    typeDecrypted = 'movie';
  } else {
    typeDecrypted = 'tv';
  }

  return [id, typeDecrypted];
}
