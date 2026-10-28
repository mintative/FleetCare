import { createContext, useContext, useEffect, useState } from "react";
import i18n from "./i18n";
import AsyncStorage from '@react-native-async-storage/async-storage';


type LanguageContextType = {
    currentLanguage: string;
    changeLanguage: (lang: string)=>Promise<void>;
}

const LanguageContext = createContext<LanguageContextType>({
    currentLanguage: 'lang',
    changeLanguage: async ()=>{},
})

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');

  const changeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem('user_language', lang);
    setCurrentLanguage(lang);
  };

  useEffect(() => {
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('user_language');
        if (savedLanguage) {
          await i18n.changeLanguage(savedLanguage);
          setCurrentLanguage(savedLanguage);
        }
      } catch (error) {
        console.error("Failed to load language from AsyncStorage:", error);
      } 
    };

    loadSavedLanguage();
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = ()=>useContext(LanguageContext);