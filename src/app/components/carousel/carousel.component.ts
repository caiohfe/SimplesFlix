import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { LoadMovie } from '../../@types/loadMovie';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-carousel',
  imports: [MovieCardComponent, CommonModule, TranslatePipe],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent {
  @Input() codeLanguage!: string;
  @Input() arrayMovie: Array<LoadMovie> = [];
  @Input() action!: () => void;
  @Input() isFavorite: boolean = false;
  @Output() deletedMovie = new EventEmitter<boolean>();

  constructor() {}

  emitEvent(): void {
    this.deletedMovie.emit();
  }
}
