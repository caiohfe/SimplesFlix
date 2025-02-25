import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LanguageSelectorService } from '../../services/language-selector.service';
import { LanguageForApplication } from '../../@types/languageApplication';

@Component({
  selector: 'app-avatar',
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  @Input() name?: string;
  @Input() photo?: string;
  @Input() desc?: string | null;
  @Input() isNameHighlighted: boolean = true;
  @Input() photoLocal: boolean = false;
  @Input() withDescription: boolean = true;
  @Input() sizeImg: string = '';
  widthImg: string = '50';
  heightImg: string = '50';
  languageApplicationCurrent!: LanguageForApplication;

  constructor(private languageService: LanguageSelectorService) {}

  ngOnInit(): void {
    this.sizeImgFn(this.sizeImg);
  }

  sizeImgFn(size: string): void {
    this.widthImg = size;
    this.heightImg = size;
  }
}
