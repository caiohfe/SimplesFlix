import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Review } from '../@types/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewsApiService {
  private apiUrl = 'http://localhost:3000/reviews';
  private reviews: Review[] = [];

  constructor(private http: HttpClient) {}

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}`);
  }

  getReviewsByMovie(movieId: string): Observable<Review[]> {
    return this.getReviews().pipe(
      map((reviews) => reviews.filter((rev) => rev.movieId == Number(movieId)))
    );
  }

  insertReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, { ...review });
  }
}
