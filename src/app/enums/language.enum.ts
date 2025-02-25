export enum Language {
  Portuguese = 'portuguese',
  English = 'english',
  Russian = 'russian',
  Japan = 'japan',
}

export interface LanguageDetails {
  description: string;
  code: string;
  flag: string;
}

export const languageDetails: { [key in Language]: LanguageDetails } = {
  [Language.Portuguese]: {
    description: 'Português',
    code: 'pt-BR',
    flag: 'fi fi-br',
  },
  [Language.English]: {
    description: 'English',
    code: 'en-US',
    flag: 'fi fi-us',
  },
  [Language.Russian]: { description: 'Русский', code: 'ru', flag: 'fi fi-ru' },
  [Language.Japan]: { description: '日本語', code: 'ja', flag: 'fi fi-jp' },
};
