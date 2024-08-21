import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import translationEN from "../assets/locales/en/translations.json";
import { isProduction } from "./utils";
export const defaultNS = "translations";
export const resources = {
    en: { translations: translationEN },
};
const i18nOptions = {
    defaultNS,
    ns: [defaultNS],
    debug: false,
    fallbackLng: "en",
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
    backend: {
        loadPath: isProduction
            ? "locales/{{lng}}/translations.json"
            : "src/assets/locales/{{lng}}/translations.json",
    },
};
void i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(Backend)
    .init(i18nOptions);
