import { Component, Input, OnInit } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { ReviewsApiService } from '../../services/reviews-api.service';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSelectorService } from '../../services/language-selector.service';

@Component({
  selector: 'app-review-card',
  imports: [CommonModule, AvatarComponent, TranslatePipe],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss',
})
export class ReviewCardComponent {
  @Input() userPhoto!: string;
  @Input() author!: string;
  @Input() reviewContent!: string;
  @Input() rating!: number;
  @Input() reviewDate!: string;
  @Input() watchedDate!: string;
  @Input() isNotEmpty: boolean = true;
  codeDate!: string;

  constructor(
    private reviewService: ReviewsApiService,
    private languageService: LanguageSelectorService
  ) {}

  ngOnInit(): void {
    this.languageService.getCode().subscribe({
      next: (code) => {
        this.codeDate = code;
      },
    });
  }
}
