import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
} from '@angular/core';
import { HeaderInformationComponent } from '../../components/header-information/header-information.component';
import { CardDetailsMovieComponent } from '../../components/card-details-movie/card-details-movie.component';
import { ActivatedRoute } from '@angular/router';
import { SynopsisCardComponent } from '../../components/synopsis-card/synopsis-card.component';
import { CommonModule, DatePipe } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { CommonButtonComponent } from '../../components/common-button/common-button.component';
import { LoadMovie } from '../../@types/loadMovie';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { Cast } from '../../@types/cast';
import { Directing } from '../../@types/directing';
import { ModalContainerComponent } from '../../components/modal/modal-container/modal-container.component';
import { LanguageSelectorService } from '../../services/language-selector.service';
import { Review } from '../../@types/review';
import { ReviewsApiService } from '../../services/reviews-api.service';
import { ReviewCardComponent } from '../../components/review-card/review-card.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BreadCrumbService } from '../../services/bread-crumb.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-movie-details',
  imports: [
    HeaderInformationComponent,
    CardDetailsMovieComponent,
    SynopsisCardComponent,
    CommonModule,
    CommonButtonComponent,
    AvatarComponent,
    ModalContainerComponent,
    ReviewCardComponent,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovieDetailsComponent implements OnInit {
  movieDetails!: LoadMovie;
  casts: Array<Cast> = [];
  outherCasts: Array<Cast> = [];
  fourFirtsCasts: Array<Cast> = [];
  director!: Directing[];
  idParam: string = '';
  exibirModalCast: boolean = false;
  exibirModalAddReview: boolean = false;
  exibirModalErroReview: boolean = false;
  reviews: Review[] = [];
  formReviews!: FormGroup;
  formInvalido: boolean = true;
  codeLanguage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private languageService: LanguageSelectorService,
    private reviewService: ReviewsApiService,
    private datePipe: DatePipe,
    private breadcrumbService: BreadCrumbService
  ) {}

  ngOnInit(): void {
    this.idParam = this.activatedRoute.snapshot.params['id'];
    this.loadReviews(this.idParam);

    this.languageService.getCode().subscribe({
      next: (code) => {
        this.codeLanguage = code;
        this.loadMovie(this.idParam);
      },
    });

    this.createForm();
    this.formValidation();
  }

  createForm(): void {
    this.formReviews = new FormGroup({
      author: new FormControl('', [
        Validators.minLength(3),
        Validators.required,
      ]),
      reviewContent: new FormControl('', [Validators.required]),
      rating: new FormControl('', [
        Validators.max(10),
        Validators.min(0),
        Validators.required,
      ]),
      watchedDate: new FormControl(
        this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
        [Validators.required]
      ),
      movieId: new FormControl(Number(this.idParam)),
      reviewDate: new FormControl(
        this.datePipe.transform(new Date(), 'yyyy-MM-dd')
      ),
      userPhoto: new FormControl('/assets/userDefault.png'),
    });
  }

  dateNotInFuture(): boolean {
    const watchedDate = new Date(this.formReviews.get('watchedDate')?.value);
    const currentDate = new Date();

    if (watchedDate > currentDate) {
      return false;
    }
    return true;
  }

  dateNotBeforeReleaseDate(): boolean {
    const watchedDate = new Date(this.formReviews.get('watchedDate')?.value);
    const releaseDate = new Date(this.movieDetails.release_date);

    if (watchedDate < releaseDate) {
      return false;
    }
    return true;
  }

  loadMovie(idParam: string): void {
    this.movieService.getMovieById(this.codeLanguage, idParam).subscribe({
      next: (res) => {
        this.movieDetails = res;
        const currentBreadcrumbs =
          this.breadcrumbService.breadcrumbsSubject.value;
        this.breadcrumbService.updateLastBreadcrumb(res.title);
      },
    });

    this.movieService
      .getCredtisMovieById(this.codeLanguage, idParam)
      .subscribe({
        next: (res) => {
          if (res.cast) {
            this.fourFirtsCasts = [...res.cast.slice(0, 4)];
          }
          if (res.crew) {
            this.director = res.crew.filter((person: Directing) => {
              return person.job === 'Director';
            });
          }
        },
      });
  }

  onSubmit(): void {
    if (!this.formInvalido) {
      if (this.dateNotInFuture() && this.dateNotBeforeReleaseDate()) {
        this.reviewService.insertReview(this.formReviews.value).subscribe({
          next: () => {
            this.loadReviews(this.idParam);
            this.clearForm();
            this.exibirModalAddReview = true;
          },
          error: (err) => {
            console.log(err);
            this.exibirModalErroReview = true;
          },
        });
      }
    }
  }

  loadMoreCasts(): void {
    this.movieService
      .getCredtisMovieById(this.codeLanguage, this.idParam)
      .subscribe({
        next: (res) => {
          if (res.cast) {
            this.outherCasts = res.cast.slice(this.fourFirtsCasts.length);
          }
        },
      });
  }

  loadModalCast(): void {
    this.exibirModalCast = !this.exibirModalCast;
  }

  loadModalAddReview(): void {
    this.exibirModalAddReview = !this.exibirModalAddReview;
  }

  loadModalErroReview(): void {
    this.exibirModalErroReview = !this.exibirModalErroReview;
  }

  loadReviews(idParam: string): void {
    this.reviewService.getReviewsByMovie(idParam).subscribe({
      next: (val) => {
        this.reviews = val;
      },
    });
  }

  formValidation(): void {
    this.formReviews.valueChanges.subscribe({
      next: (val) => {
        if (this.formReviews.invalid) {
          this.formInvalido = true;
        } else {
          this.formInvalido = false;
        }
      },
    });
  }

  clearForm(): void {
    this.formReviews.get('author')?.reset();
    this.formReviews.get('reviewContent')?.reset();
    this.formReviews.get('rating')?.reset();
    this.formReviews
      .get('watchedDate')
      ?.value(this.datePipe.transform(new Date(), 'yyyy-MM-dd'));
  }
}
