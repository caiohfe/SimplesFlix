import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { UpComing } from '../@types/upComing';
import { LoadMovie } from '../@types/loadMovie';

@Injectable({
  providedIn: 'root',
})
export class UpComingService {
  private apiUrl = 'https://api.themoviedb.org/3/movie/upcoming';

  private defaultHeaders = {
    Authorization: 'Bearer ' + environment.apiKey,
  };

  constructor(private http: HttpClient) {}

  getUpComing(language: string, page: number): Observable<UpComing> {
    let params = new HttpParams();
    params = params.set('language', language);
    params = params.set('page', page);

    return this.http.get<UpComing>(this.apiUrl, {
      params: params,
      headers: this.defaultHeaders,
    });
  }

  getUpComingById(language: string, id: string): Observable<LoadMovie> {
    let params = new HttpParams();
    params = params.set('language', language);

    return this.http.get<LoadMovie>(`${this.apiUrl}/${id}`, {
      params: params,
      headers: this.defaultHeaders,
    });
  }
}
