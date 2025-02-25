import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Language,
  LanguageDetails,
  languageDetails,
} from '../../enums/language.enum';
import { LanguageSelectorService } from '../../services/language-selector.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-language-selector',
  imports: [],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
})
export class LanguageSelector implements OnInit {
  flag!: string;
  languageEnum = Language;
  languageDetailsEnum = languageDetails;
  codeLanguage!: string;
  languageActive!: string;
  languageSelect$ = new Subject<Language>();

  constructor(private languageService: LanguageSelectorService) {}

  ngOnInit(): void {
    this.languageActive = this.languageService.getLanguageCurrent().description;
    this.flag = this.languageService.getLanguageCurrent().flag;
    this.codeLanguage = this.languageService.getLanguageCurrent().code;

    this.loadLanguage();
  }

  loadLanguage(): void {
    this.languageService.getLanguage().subscribe({
      next: (lang) => {
        this.languageActive = lang.description;
        this.flag = lang.flag;
        this.codeLanguage = lang.code;
      },
    });
  }

  returnLanguage(value: Language): void {
    console.log(value);
    this.languageService.setLanguage(value);
  }
}
