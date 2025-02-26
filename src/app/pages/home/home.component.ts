import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
} from '@angular/core';
import { CommonButtonComponent } from '../../components/common-button/common-button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSelectorService } from '../../services/language-selector.service';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { LoadMovie } from '../../@types/loadMovie';
import { BreadCrumbService } from '../../services/bread-crumb.service';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { TopRatedService } from '../../services/top-rated.service';
import { TopRated } from '../../@types/topRated';
import { MovieListItem } from '../../@types/movieListItem';

@Component({
  selector: 'app-home',
  imports: [
    CommonButtonComponent,
    TranslatePipe,
    RouterLink,
    CommonModule,
    CarouselComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit, AfterViewInit {
  codeLanguage!: string;
  favorites: LoadMovie[] = [];
  rateds: LoadMovie[] = [];

  constructor(
    private languageService: LanguageSelectorService,
    private favoritesService: FavoritesService,
    private movieService: MovieService,
    private breadCrumbService: BreadCrumbService,
    private topRatedService: TopRatedService
  ) {}

  ngOnInit(): void {
    this.getCodeLang();
    this.loadTopRated();
  }

  ngAfterViewInit() {
    this.breadCrumbService.breadcrumbSubject$.next([
      {
        label: 'sidenav.home',
        url: '/',
      },
    ]);
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

  loadTopRated(): void {
    this.topRatedService.getTopRated(this.codeLanguage, 1).subscribe({
      next: (res) => {
        this.rateds = res.results;
        console.log('TOP RATED', this.rateds);
      },
    });
  }

  getCodeLang(): void {
    this.languageService.getCode().subscribe({
      next: (code) => {
        this.codeLanguage = code;
        this.loadFavorites();
      },
    });
  }
}
