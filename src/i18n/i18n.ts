import i18n from "i18next";
import { initReactI18next } from 'react-i18next'
import { english } from "./english";
import { japanese } from "./japanese";

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  },
  resources: {
    'en': english,
    'jp': japanese
  }
});

export default i18n;