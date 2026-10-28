
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en.json';
import uk from './locales/uk.json';
import pl from './locales/pl.json';


const LANGUAGE_KEY="user_language";

const resources = {
    en: {translation: en},
    pl: {translation: pl},
    uk: {translation: uk}
}

const getSystemLanguage = () => {
  const locales = RNLocalize.getLocales();
  if (locales.length > 0) {
    const lang = locales[0].languageCode;
    return resources[lang as keyof typeof resources] ? lang : 'en';
  }
  return 'en';
};


const initI18n = async ()=> {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    const initialLanguage = savedLanguage || getSystemLanguage();

    i18n.use(initReactI18next).init({
        resources,
        lng: initialLanguage,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });
}

initI18n();
export default i18n;