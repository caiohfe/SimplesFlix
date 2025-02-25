import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';
import { Directing } from '../../@types/directing';
import { Genres } from '../../@types/genres';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSelectorService } from '../../services/language-selector.service';

@Component({
  selector: 'app-card-details-movie',
  imports: [CommonModule, BadgeComponent, TranslatePipe],
  templateUrl: './card-details-movie.component.html',
  styleUrl: './card-details-movie.component.scss',
})
export class CardDetailsMovieComponent implements OnInit {
  @Input() imgMovie!: string;
  @Input() releaseDate!: string;
  @Input() rating!: string;
  @Input() director!: Directing[];
  @Input() genres!: Genres[];
  codeDate!: string;

  constructor(private languageService: LanguageSelectorService) {}

  ngOnInit(): void {
    this.languageService.getCode().subscribe({
      next: (code) => {
        this.codeDate = code;
      },
    });
  }
}
