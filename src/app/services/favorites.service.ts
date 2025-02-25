import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FavoriteMovie } from '../@types/movieFavorite';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private apiUrl = 'http://localhost:3000/favorites';

  constructor(private http: HttpClient) {}

  getFavorites(): Observable<FavoriteMovie[]> {
    return this.http.get<FavoriteMovie[]>(this.apiUrl);
  }

  addFavorite(favoriteMovie: FavoriteMovie): Observable<FavoriteMovie> {
    return this.http.post<FavoriteMovie>(`${this.apiUrl}`, {
      ...favoriteMovie,
    });
  }

  removeFavorite(id: string): Observable<FavoriteMovie> {
    return this.http.delete<FavoriteMovie>(`${this.apiUrl}/${id}`);
  }
}
