export interface IDcflixApiJson<I> {
  message: string;
  statusCode: number;
  data?: I;
}
