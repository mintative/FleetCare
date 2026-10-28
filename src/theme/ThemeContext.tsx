import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeMode = 'light' | 'dark' | 'system';

type ThemeContextType = {
    theme: typeof lightTheme;
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    isDark: boolean;
};

type Props = {
    children: ReactNode;
}

const THEME_STORAGE_KEY = '@app_theme_mode';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children} : Props)=> {
    const systemScheme = useColorScheme();
    const [themeMode, setThemeModeState] = useState<ThemeMode>('system');

    useEffect(() => {
        const loadSavedTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system')) {
                    setThemeModeState(savedTheme as ThemeMode);
                }
            } catch (error) {
                console.error("Failed to load theme from storage", error);
            }
        };

        loadSavedTheme();
    }, []);

    const setThemeMode = async (mode: ThemeMode) => {
        try {
            setThemeModeState(mode);
            await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
        } catch (error) {
            console.error("Failed to save theme to storage", error);
        }
    };

    const activeScheme = themeMode === 'system' ? systemScheme : themeMode;
    const theme = activeScheme === 'dark' ? darkTheme : lightTheme
    const isDark = activeScheme === 'dark';

    return (
        <ThemeContext.Provider value={{theme, themeMode, setThemeMode, isDark}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};