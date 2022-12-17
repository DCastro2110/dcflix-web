import { IDcflixApiJson } from '@/types/IDcflixApiJson';
import { dcflixApi } from '.';

interface IData {
  mediaInTheUserList: boolean;
}

export async function verifyIfMediaIsInTheUserList(
  mediaId: string
): Promise<IDcflixApiJson<IData>> {
  const res = await dcflixApi.get(`my-list/${mediaId}`);
  const { data } = res;

  return data as IDcflixApiJson<IData>;
}
