import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObservableSearchService {
  private searchSubject = new BehaviorSubject<string>('');
  searched$ = this.searchSubject.asObservable();

  outputSearchedValue(value: string): void {
    this.searchSubject.next(value);
  }
}
