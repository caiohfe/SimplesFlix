import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageSelectorService } from '../../services/language-selector.service';
import { FavoritesService } from '../../services/favorites.service';
import { MovieListItem } from '../../@types/movieListItem';
import { FavoriteMovie } from '../../@types/movieFavorite';
import { LocationUpgradeModule } from '@angular/common/upgrade';

@Component({
  selector: 'app-movie-card',
  imports: [DatePipe, RouterLink, CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() id!: number;
  @Input() movieTitle!: string;
  @Input() releaseDate!: string;
  @Input() image!: string;
  @Input() routerLinkImg!: (string | number)[];
  @Input() isFavorite: boolean = false;
  @Output() deleted = new EventEmitter<boolean>();
  codeDate!: string;
  movie!: FavoriteMovie;
  idDbJson: string | undefined = '';

  constructor(
    private languageService: LanguageSelectorService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.languageService.getCode().subscribe({
      next: (code) => {
        this.codeDate = code;
      },
    });
    this.createMovie(this.id);
    this.checkFavorite();
    console.log('ID ONINIT:', this.id);
  }
  createMovie(movieId: number): void {
    this.movie = {
      movieId: movieId,
    };
  }

  checkFavorite() {
    if (!this.isFavorite) {
      this.favoritesService.getFavorites().subscribe({
        next: (favorites) => {
          this.isFavorite = favorites.some((fav) => fav.movieId === this.id);
        },
      });
    }
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.favoritesService.getFavorites().subscribe({
        next: (movie) => {
          movie.forEach((value) => {
            if (value.movieId == this.id) {
              console.log('REMOVENDO FILME: ', value.id);
              this.favoritesService.removeFavorite(value.id!).subscribe({
                next: () => {
                  this.isFavorite = false;
                  this.checkFavorite();
                  this.deleted.emit();
                },
              });
            }
          });
        },
      });
    } else {
      this.favoritesService.addFavorite(this.movie).subscribe({
        next: () => {
          this.isFavorite = true;
          this.checkFavorite();
        },
      });
    }
  }
}
