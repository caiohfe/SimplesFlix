import { Injectable, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MovieListItem } from '../@types/movieListItem';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadMovie } from '../@types/loadMovie';
import { Cast } from '../@types/cast';
import { Credits } from '../@types/credits';
import { PopularMovies } from '../@types/popularMovies';

@Injectable({
  providedIn: 'root', // Faz o serviço ser global e disponível em toda a aplicação
})
export class MovieService implements OnInit {
  private apiUrl = 'https://api.themoviedb.org/3/movie';

  private defaultHeaders = {
    Authorization: 'Bearer ' + environment.apiKey,
  };

  constructor(private http: HttpClient) {}

  getPopularMovies(language: string, page: number): Observable<PopularMovies> {
    let params = new HttpParams(); //query params
    params = params.set('language', language);
    params = params.set('page', page);

    return this.http.get<PopularMovies>(`${this.apiUrl}/popular`, {
      params: params,
      headers: this.defaultHeaders,
    });
  }

  ngOnInit(): void {}

  getMovieById(language: string, id: string): Observable<LoadMovie> {
    let params = new HttpParams();
    params = params.set('language', language);

    return this.http.get<LoadMovie>(`${this.apiUrl}/${id}`, {
      params: params,
      headers: this.defaultHeaders,
    });
  }

  getCredtisMovieById(language: string, id: string): Observable<Credits> {
    let params = new HttpParams();
    params = params.set('language', language);

    return this.http.get<Credits>(`${this.apiUrl}/${id}/credits`, {
      params: params,
      headers: this.defaultHeaders,
    });
  }

  //#region Old Service
  // private movies: Movie[] = [
  //   {
  //     id: 1,
  //     image: 'assets/a-teia.png',
  //     title: 'A Teia',
  //     releaseDate: '22 de março de 2024',
  //     director: 'Adam Cooper',
  //     rating: '7.5',
  //     synopsis:
  //       'Um filme de suspense sobre uma rede de espionagem internacional que ameaça a segurança global.',
  //     genres: ['Suspense', 'Ação', 'Thriller'],
  //     cast: [
  //       {
  //         character: 'Roy Freeman',
  //         actorName: 'Russell Crowe',
  //         actorImage: '/assets/actors/russell-crowe.png',
  //       },
  //       {
  //         character: 'Laura Baines / Elizabeth Westlake',
  //         actorName: 'Karen Gillan',
  //         actorImage: '/assets/actors/karen-gillan.png',
  //       },
  //       {
  //         character: 'Dr. Joseph Wieder',
  //         actorName: 'Marton Csokas',
  //         actorImage: '/assets/actors/marton-csokas.png',
  //       },
  //       {
  //         character: 'Jimmy Remis',
  //         actorName: 'Tommy Flanagan',
  //         actorImage: '/assets/actors/tommy-flanagan.png',
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     image: 'assets/alerta-vermelho.png',
  //     title: 'Alerta Vermelho',
  //     releaseDate: '4 de novembro de 2021',
  //     director: 'Rawson Marshall Thurber',
  //     rating: '6.3',
  //     synopsis:
  //       'Um agente do FBI une forças com dois ladrões de arte para capturar o criminoso mais procurado do mundo, enquanto enfrentam diversos obstáculos e se envolvem em uma emocionante caçada internacional.',
  //     genres: ['Ação', 'Comédia', 'Crime'],
  //     cast: [
  //       {
  //         character: 'John Hartley',
  //         actorName: 'Dwayne Johnson',
  //         actorImage: '/assets/actors/dwayne-johnson.png',
  //       },
  //       {
  //         character: 'Nolan Booth',
  //         actorName: 'Ryan Reynolds',
  //         actorImage: '/assets/actors/ryan-reynolds.png',
  //       },
  //       {
  //         character: 'Sarah Black',
  //         actorName: 'Gal Gadot',
  //         actorImage: '/assets/actors/gal-gadot.png',
  //       },
  //       {
  //         character: 'Inspetora Urvashi Das',
  //         actorName: 'Ritu Arya',
  //         actorImage: '/assets/actors/ritu-arya.png',
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     image: 'assets/desapega.png',
  //     title: 'Desapega',
  //     releaseDate: '1 de dezembro de 2022',
  //     director: 'Hsu Chien',
  //     rating: '6.8',
  //     synopsis:
  //       'Uma comédia romântica sobre aprender a deixar ir o passado e abraçar novas oportunidades.',
  //     genres: ['Comédia', 'Romance'],
  //     cast: [
  //       {
  //         character: 'Duda',
  //         actorName: 'Maisa Silva',
  //         actorImage: '/assets/actors/maisa-silva.png',
  //       },
  //       {
  //         character: 'Rita',
  //         actorName: 'Glória Pires',
  //         actorImage: '/assets/actors/gloria-pires.png',
  //       },
  //       {
  //         character: 'Otávio',
  //         actorName: 'Marcos Pasquim',
  //         actorImage: '/assets/actors/marcos-pasquim.png',
  //       },
  //       {
  //         character: 'Romulo',
  //         actorName: 'Wagner Santisteban',
  //         actorImage: '/assets/actors/wagner-santisteban.png',
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     image: 'assets/deu-preguica.png',
  //     title: 'Deu Preguiça',
  //     releaseDate: '2 de fevereiro de 2025',
  //     director: 'Tania Vincent, Ricard Cussó',
  //     rating: '5.9',
  //     synopsis:
  //       'Em Deu Preguiça!, após uma tempestade devastadora que destrói sua casa, Laura (Teo Vergara), a preguiça mais veloz de sua comunidade, decide recomeçar sua vida na cidade grande.',
  //     genres: ['Comédia'],
  //     cast: [
  //       {
  //         character: 'Laura',
  //         actorName: 'Teo Vergara',
  //         actorImage: '/assets/actors/teo-vergara.png',
  //       },
  //       {
  //         character: 'Gabriella',
  //         actorName: 'Olivia Vasquez',
  //         actorImage: '/assets/actors/olivia-vasquez.png',
  //       },
  //       {
  //         character: 'Luis',
  //         actorName: 'Ben Gorroño',
  //         actorImage: '/assets/actors/ben-gorrono.png',
  //       },
  //       {
  //         character: 'Mani',
  //         actorName: 'Facundo Hache Herrera',
  //         actorImage: '/assets/actors/facundo-herrera.png',
  //       },
  //     ],
  //   },
  //   {
  //     id: 5,
  //     image: 'assets/no-olho-do-furacao.png',
  //     title: 'No Olho do Furacão',
  //     releaseDate: '7 de junho de 2018',
  //     director: 'Rob Cohen',
  //     rating: '6.1',
  //     synopsis:
  //       'Um filme de desastre que segue um grupo de sobreviventes lutando contra um furacão catastrófico.',
  //     genres: ['Ação', 'Suspense', 'Desastre'],
  //     cast: [
  //       {
  //         character: 'Casey Corbyn',
  //         actorName: 'Maggie Grace',
  //         actorImage: '/assets/actors/maggie-grace.png',
  //       },
  //       {
  //         character: 'Will Rutledge',
  //         actorName: 'Toby Kebbell',
  //         actorImage: '/assets/actors/toby-kebbell.png',
  //       },
  //       {
  //         character: 'Sasha Van Dietrich',
  //         actorName: 'Melissa Bolona',
  //         actorImage: '/assets/actors/melissa-bolona.png',
  //       },
  //       {
  //         character: 'Breeze Rutledge',
  //         actorName: 'Ryan Kwanten',
  //         actorImage: '/assets/actors/ryan-kwanten.png',
  //       },
  //     ],
  //   },
  //   {
  //     id: 6,
  //     image: 'assets/o-auto-da-boa-mentira.png',
  //     title: 'Auto da Boa Mentira',
  //     releaseDate: '15 de abril de 2021',
  //     director: 'José Eduardo Belmonte',
  //     rating: '7.2',
  //     synopsis:
  //       'Uma comédia dramática sobre um grupo de amigos cujas mentiras, inicialmente inofensivas, acabam criando uma série de complicações engraçadas e inesperadas em suas vidas.',
  //     genres: ['Comédia', 'Drama'],
  //     cast: [
  //       {
  //         character: 'Helder Flores',
  //         actorName: 'Leandro Hassun',
  //         actorImage: '/assets/actors/leandro-hassun.png',
  //       },
  //       {
  //         character: 'Lorena',
  //         actorName: 'Cacá Ottoni',
  //         actorImage: '/assets/actors/caca-ottoni.png',
  //       },
  //       {
  //         character: 'Fabiano',
  //         actorName: 'Renato Góes',
  //         actorImage: '/assets/actors/renato-goes.png',
  //       },
  //       {
  //         character: 'Luzia',
  //         actorName: 'Cássia Kiz',
  //         actorImage: '/assets/actors/cassia-kiz.png',
  //       },
  //     ],
  //   },
  //   {
  //     id: 7,
  //     image: 'assets/paddington2.png',
  //     title: 'Paddington 2',
  //     releaseDate: '9 de novembro de 2017',
  //     director: 'Paul King',
  //     rating: '7.8',
  //     synopsis:
  //       'O adorável urso Paddington parte em uma aventura para encontrar o presente perfeito para sua tia Lucy.',
  //     genres: ['Infantil', 'Comédia', 'Família'],
  //     cast: [
  //       {
  //         character: 'Paddington',
  //         actorName: 'Ben Whishaw',
  //         actorImage: '/assets/actors/ben-whishaw.png',
  //       },
  //       {
  //         character: 'Judy Brown',
  //         actorName: 'Madeleine Harris',
  //         actorImage: '/assets/actors/madeleine-harris.png',
  //       },
  //       {
  //         character: 'Sr. Brown',
  //         actorName: 'Hugh Bonneville',
  //         actorImage: '/assets/actors/hugh-bonneville.png',
  //       },
  //       {
  //         character: 'Sra. Brown',
  //         actorName: 'Sally Hawkins',
  //         actorImage: '/assets/actors/sally-hawkins.png',
  //       },
  //     ],
  //   },
  //   {
  //     id: 8,
  //     image: 'assets/refem-do-jogo.png',
  //     title: 'Refém do Jogo',
  //     releaseDate: '22 de novembro de 2018',
  //     director: 'Scott Mann',
  //     rating: '6.5',
  //     synopsis:
  //       'Michael Knox visita a esposa e filha de um grande amigo, que faleceu quando ambos serviram no Afeganistão. Em uma destas visitas, Knox leva a adolescente para ver um jogo de futebol, sem imaginar que o estádio será alvo de uma ação terrorista.',
  //     genres: ['Suspense', 'Thriller'],
  //     cast: [
  //       {
  //         character: 'Michael Knox',
  //         actorName: 'Dave Bautista',
  //         actorImage: '/assets/actors/dave-bastista.png',
  //       },
  //       {
  //         character: 'Arkady Belav',
  //         actorName: 'Ray Stevenson',
  //         actorImage: '/assets/actors/ray-stevenson.png',
  //       },
  //       {
  //         character: 'Danni',
  //         actorName: 'Lara Peake',
  //         actorImage: '/assets/actors/lara-peake.png',
  //       },
  //       {
  //         character: 'Tatiana',
  //         actorName: 'Alexandra Dinu',
  //         actorImage: '/assets/actors/alexandra-dinu.png',
  //       },
  //     ],
  //   },
  //   {
  //     id: 9,
  //     image: 'assets/silvio.png',
  //     title: 'Silvio',
  //     releaseDate: '12 de setembro de 2024',
  //     director: 'Marcelo Antunez',
  //     rating: '7.0',
  //     synopsis:
  //       'A história de um homem comum, Silvio, que, em meio ao caos urbano e desafios imprevistos, se vê em uma jornada para salvar sua comunidade e se tornar um herói improvável.',
  //     genres: ['Drama', 'Ação'],
  //     cast: [
  //       {
  //         character: 'Silvio',
  //         actorName: 'Rodrigo Faro',
  //         actorImage: '/assets/actors/rodrigo-faro.png',
  //       },
  //       {
  //         character: 'Patrícia Abravanel',
  //         actorName: 'Polliana Aleixo',
  //         actorImage: '/assets/actors/polliana-aleixo.png',
  //       },
  //       {
  //         character: 'Delegada Civil Laura',
  //         actorName: 'Bruna Aiiso',
  //         actorImage: '/assets/actors/bruna-aiiso.png',
  //       },
  //       {
  //         character: 'Fernando',
  //         actorName: 'Johnnas Oliva',
  //         actorImage: '/assets/actors/johnnas-oliva.png',
  //       },
  //     ],
  //   },
  //   {
  //     id: 10,
  //     image: 'assets/terrifier2.png',
  //     title: 'Terrifier 2',
  //     releaseDate: '6 de outubro de 2022',
  //     director: 'Damien Leone',
  //     rating: '6.0',
  //     synopsis:
  //       'Depois de ser ressuscitado por uma entidade maligna, o palhaço Art está de volta ao condado de Miles. Agora, ele tenta caçar uma adolescente e seu irmão mais novo durante o Halloween.',
  //     genres: ['Terror', 'Slasher'],
  //     cast: [
  //       {
  //         character: 'Art the Clown',
  //         actorName: 'David Howard Thornton',
  //         actorImage: '/assets/actors/david-howard-thornton.png',
  //       },
  //       {
  //         character: 'Sienna Shaw',
  //         actorName: 'Lauren LaVera',
  //         actorImage: '/assets/actors/lauren-lavera.png',
  //       },
  //       {
  //         character: 'Jonathan Shaw',
  //         actorName: 'Elliott Fullam',
  //         actorImage: '/assets/actors/elliott-fullam.png',
  //       },
  //       {
  //         character: 'Barbara',
  //         actorName: 'Sarah Voigt',
  //         actorImage: '/assets/actors/sarah-voigt.png',
  //       },
  //     ],
  //   },
  // ];

  // getMovies(): Movie[] {
  //   return this.movies;
  // }

  // getMovieById(id: number): Movie {
  //   let movie = this.movies.find((movie) => movie.id == id);
  //   return movie!;
  // }

  // getMoviesForListPage(quantityToBeLoaded?: number): MovieListItem[] {
  //   let movies = this.movies.map(({ id, image, title, releaseDate }) => ({
  //     id,
  //     image,
  //     title,
  //     releaseDate,
  //   }));
  //   return movies.slice(0, quantityToBeLoaded);
  // }

  // getMoreMovies(startIndex: number, quantityToBeLoaded: number): Movie[] {
  //   return this.movies.slice(startIndex, startIndex + quantityToBeLoaded);
  // }
  //#endregion
}
