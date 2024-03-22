import { getUserLocale } from 'get-user-locale';
import { I18n } from 'i18n-js';

// Translations
import German from './languages/de.json';
import English from './languages/en.json';
import Spanish from './languages/es.json';
import French from './languages/fr.json';
import Japanese from './languages/ja.json';
import Portuguese from './languages/pt.json';
import Russian from './languages/ru.json';
import Chinese from './languages/zh.json';

export const i18n = new I18n();
i18n.enableFallback = true;
i18n.locale = getUserLocale();
i18n.translations = {
  de: German,
  en: English,
  es: Spanish,
  fr: French,
  ja: Japanese,
  pt: Portuguese,
  ru: Russian,
  zh: Chinese
};

// --------------------------------------------- //
// ----------------- Constants ----------------- //
// --------------------------------------------- //

export const languageCodes = {
  de: 'de',
  en: 'en',
  es: 'es',
  fr: 'fr',
  ja: 'ja',
  pt: 'pt',
  ru: 'ru',
  zh: 'zh'
};

// Returns the language name as text given a language code
export function getLanguageTextForLanguageCode(languageCode?: string) {
  const languages = Languages();
  languageCode = languageCode ?? i18n.locale.split('-')[0];

  switch (languageCode) {
    case languages.chinese.code:
      return languages.chinese.text;
    case languages.english.code:
      return languages.english.text;
    case languages.french.code:
      return languages.french.text;
    case languages.german.code:
      return languages.german.text;
    case languages.japanese.code:
      return languages.japanese.text;
    case languages.portuguese.code:
      return languages.portuguese.text;
    case languages.russian.code:
      return languages.russian.text;
    case languages.spanish.code:
      return languages.spanish.text;
    default:
      return languages.english.text;
  }
}

// This needs to be a function so the translations are updated when the language
// is changed
export const Languages = () => {
  return {
    chinese: {
      code: languageCodes.zh,
      text: i18n.t('chinese')
    },
    english: {
      code: languageCodes.en,
      text: i18n.t('english')
    },
    french: {
      code: languageCodes.fr,
      text: i18n.t('french')
    },
    german: {
      code: languageCodes.de,
      text: i18n.t('german')
    },
    japanese: {
      code: languageCodes.ja,
      text: i18n.t('japanese')
    },
    portuguese: {
      code: languageCodes.pt,
      text: i18n.t('portuguese')
    },
    russian: {
      code: languageCodes.ru,
      text: i18n.t('russian')
    },
    spanish: {
      code: languageCodes.es,
      text: i18n.t('spanish')
    }
  };
};
