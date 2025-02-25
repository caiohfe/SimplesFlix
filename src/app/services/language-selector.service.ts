import { Injectable } from '@angular/core';
import {
  Language,
  LanguageDetails,
  languageDetails,
} from '../enums/language.enum';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageSelectorService {
  private language$: BehaviorSubject<LanguageDetails>;
  private languageCurrent: Language;

  constructor(private translateService: TranslateService) {
    this.languageCurrent = Language.Portuguese;
    this.language$ = new BehaviorSubject<LanguageDetails>(
      languageDetails[this.languageCurrent]
    );
  }

  getDescription(language: Language): string {
    return languageDetails[language].description;
  }

  getCode(): Observable<string> {
    return this.getLanguage().pipe(map((lang) => lang.code));
  }

  setLanguage(language: Language): void {
    if (language) {
      this.languageCurrent = language;
      this.language$.next(languageDetails[language]);
      this.translateService.use(languageDetails[language].code);
    }
  }

  getLanguageCurrent(): LanguageDetails {
    return languageDetails[this.languageCurrent];
  }

  getLanguage(): Observable<LanguageDetails> {
    return this.language$.asObservable();
  }

  setCodeLanguage(language: Language): void {
    this.setLanguage(language);
  }
}
