export interface IDcflixApiJson<I = void> {
  message: string;
  statusCode: number;
  data: I extends Object ? I : undefined;
}
