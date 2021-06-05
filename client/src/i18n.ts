import i18n from 'i18next';
import { initReactI18next } from 'preact-i18next';
import backend from "i18next-xhr-backend";

const userLanguage = window.navigator.language;

i18n.use(backend).use(initReactI18next).init({
  lng: localStorage.getItem('language') || userLanguage || 'en',
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false
  },
  backend: {
    loadPath: process.env.NODE_ENV === 'development' ? '/{{lng}}.json' : '/static/{{lng}}.json',
  }
})

export default i18n;