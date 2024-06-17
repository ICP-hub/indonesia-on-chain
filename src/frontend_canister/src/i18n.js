import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enLang from './locales/en/global.json';
import inLang from './locales/in/global.json';


i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enLang
            },
            in: {
                translation: inLang
            },
           
        },
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false, 
        },
    });

export default i18n;
