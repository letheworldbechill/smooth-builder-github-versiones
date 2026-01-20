// =============================================================================
// SMOOTH BUILDER PRO - i18n CONFIGURATION
// 7 Sprachen: DE, EN, FR, ES, PT, ID, AR (RTL)
// =============================================================================

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import de from './locales/de.json';
import en from './locales/en.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import pt from './locales/pt.json';
import id from './locales/id.json';
import ar from './locales/ar.json';

export const supportedLanguages = ['de', 'en', 'fr', 'es', 'pt', 'id', 'ar'] as const;
export type SupportedLanguage = typeof supportedLanguages[number];

export const languageNames: Record<SupportedLanguage, string> = {
  de: 'Deutsch',
  en: 'English',
  fr: 'Français',
  es: 'Español',
  pt: 'Português',
  id: 'Bahasa Indonesia',
  ar: 'العربية',
};

export const rtlLanguages: SupportedLanguage[] = ['ar'];
export const isRTL = (lang: string): boolean => rtlLanguages.includes(lang as SupportedLanguage);

i18n.use(initReactI18next).init({
  resources: {
    de: { translation: de },
    en: { translation: en },
    fr: { translation: fr },
    es: { translation: es },
    pt: { translation: pt },
    id: { translation: id },
    ar: { translation: ar },
  },
  lng: 'de',
  fallbackLng: 'de',
  interpolation: { escapeValue: false },
});

export default i18n;
