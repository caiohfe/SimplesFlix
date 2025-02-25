import { Genres } from './genres';

export type LoadMovie = {
  id: number;
  poster_path: string;
  release_date: string;
  overview: string;
  director: string;
  vote_average: string;
  genres: Genres[];
  title: string;
};
