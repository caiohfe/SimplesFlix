import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonButtonComponent } from '../../components/common-button/common-button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieListItem } from '../../@types/movieListItem';
import { LanguageSelectorService } from '../../services/language-selector.service';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';
import { FavoriteMovie } from '../../@types/movieFavorite';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.model';
import { LoadMovie } from '../../@types/loadMovie';

@Component({
  selector: 'app-home',
  imports: [
    CommonButtonComponent,
    TranslatePipe,
    MovieCardComponent,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
  codeLanguage!: string;
  favorites: LoadMovie[] = [];

  constructor(
    private languageService: LanguageSelectorService,
    private favoritesService: FavoritesService,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.getCodeLang();
  }

  loadFavorites(): void {
    this.favorites = [];
    this.favoritesService.getFavorites().subscribe({
      next: (movies) => {
        movies.forEach((element) => {
          console.log('ELEMENT:', element);
          this.movieService
            .getMovieById(this.codeLanguage, element.movieId.toString())
            .subscribe({
              next: (value) => {
                this.favorites.push(value);
                console.log(this.favorites);
              },
            });
        });
      },
    });
  }

  movieDeleted(): void {}

  getCodeLang(): void {
    this.languageService.getCode().subscribe({
      next: (code) => {
        this.codeLanguage = code;
        this.loadFavorites();
      },
    });
  }
}
