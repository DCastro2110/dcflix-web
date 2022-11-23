export interface KnownFor {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  name: string;
  origin_country: string[];
  original_name: string;
}

export interface IWantedMedia {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  media_type: 'tv' | 'movie' | 'person';
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  adult?: boolean;
  gender?: number;
  known_for: KnownFor[];
  known_for_department: string;
  profile_path: string;
  original_title: string;
  release_date: string;
  title: string;
  video?: boolean;
}
