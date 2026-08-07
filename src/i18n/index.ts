import i18next from 'i18next';
import en from './locales/en.json';

i18next.init({
  lng: 'en',
  resources: {
    en: { translation: en }
  },
  fallbackLng: 'en'
});

export function t(key: string) {
  return i18next.t(key);
}

export default i18next;
