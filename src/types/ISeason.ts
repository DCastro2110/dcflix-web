import { IEpisode } from './IEpisode';

export interface ISeason {
  _id: string;
  air_date: string;
  episodes: IEpisode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
}
