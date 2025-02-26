import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TopRated } from '../@types/topRated';
import { LoadMovie } from '../@types/loadMovie';

@Injectable({
  providedIn: 'root',
})
export class TopRatedService {
  private apiUrl = 'https://api.themoviedb.org/3/movie/top_rated';

  private defaultHeaders = {
    Authorization: 'Bearer ' + environment.apiKey,
  };

  constructor(private http: HttpClient) {}

  getTopRated(language: string, page: number): Observable<TopRated> {
    let params = new HttpParams();
    params = params.set('language', language);
    params = params.set('page', page);

    return this.http.get<TopRated>(this.apiUrl, {
      params: params,
      headers: this.defaultHeaders,
    });
  }

  getTopRatedById(language: string, id: string): Observable<LoadMovie> {
    let params = new HttpParams();
    params = params.set('language', language);

    return this.http.get<LoadMovie>(`${this.apiUrl}/${id}`, {
      params: params,
      headers: this.defaultHeaders,
    });
  }
}
