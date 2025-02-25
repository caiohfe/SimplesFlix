import { Component, Input, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { AvatarComponent } from '../avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { LanguageSelectorService } from '../../services/language-selector.service';
import { LanguageForApplication } from '../../@types/languageApplication';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-side-bar',
  imports: [
    RouterLink,
    RouterLinkActive,
    AvatarComponent,
    CommonModule,
    TranslatePipe,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent implements OnInit {
  languageApplicationCurrent!: LanguageForApplication;

  constructor(
    private router: Router,
    private languageService: LanguageSelectorService
  ) {}

  ngOnInit(): void {}

  isMoviesActive(): boolean {
    return this.router.url.startsWith('/movie');
  }
}
