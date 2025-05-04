import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from './translations/en.json';
import pt from './translations/pt.json';

const languageResouces = {
  en: { translation: en },
  pt: { translation: pt }
}


i18n.use(initReactI18next).init(
{
  compatibilityJSON: 'v4',
  fallbackLng: 'en',
  resources: languageResouces,  
}
)
export default i18n;