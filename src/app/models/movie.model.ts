import { Cast } from '../@types/cast';

export type Movie = {
  id: number;
  image: string;
  title: string;
  releaseDate: string;
  director: string;
  rating: string;
  synopsis: string;
  genres: string[];
  cast: Cast[];
};
