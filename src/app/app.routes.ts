import { Routes } from '@angular/router';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { breadcrumb: 'Início' },
      },
      {
        path: 'movies',
        component: MoviesComponent,
        data: { breadcrumb: 'Filmes' },
      },
      {
        path: 'movie/:id',
        component: MovieDetailsComponent,
        data: { breadcrumb: 'Detalhes' },
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
