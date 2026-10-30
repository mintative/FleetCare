import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { ThemeMode, useTheme } from "../../theme/ThemeContext";
import { AppText } from "../AppText";
import { PlainText } from "../PlainText";
import SunIcon from "../../assets/icons/sun.svg";
import MoonIcon from "../../assets/icons/moon.svg";
import SystemIcon from "../../assets/icons/pc.svg";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export const ThemeSwitcher = () => {
    const {theme, themeMode, setThemeMode} = useTheme();
    const {t} = useTranslation();


    const options: ThemeMode[] = ["light", "dark", "system"];

    const themes = useMemo(()=>[
        {
            option: "light",
            title: t("profile.themes.light")
        },
        {
            option: "dark",
            title: t("profile.themes.dark")
        },
        {
            option: "system",
            title: t("profile.themes.system")
        }
    ],[t])

    return (
        <View style={styles.container}>
            <PlainText style={styles.title}>{t("profile.appearance")}</PlainText>

            <View style={[styles.segmentedContainer, {backgroundColor: theme.card}]}>
            {themes.map(option => {
                const isActive = themeMode === option.option;

                return (
                <TouchableOpacity
                    key={option.option}
                    activeOpacity={0.8}
                    onPress={() => setThemeMode(option.option as ThemeMode)}
                    style={[
                    styles.segment,
                    
                    isActive && [styles.activeSegment, {backgroundColor: theme.background}],
                    ]}
                >
                    <View>
                    {option.option === "light" ? <SunIcon width={20} height={20} color={theme.text}/> 
                    : option.option === "dark" ? <MoonIcon width={20} height={20} color={theme.text}/>
                    : option.option === "system" ? <SystemIcon width={20} height={20} color={theme.text}/>
                    : ""}
                    </View>
                    
                    <AppText
                    style={[
                        styles.segmentText,
                        {color:theme.text},
                        isActive && [styles.activeSegmentText, {color: theme.text}],
                    ]}
                    >
                    
                    {option.title}
                    </AppText>
                </TouchableOpacity>
                );
            })}
            </View>
        </View>
    );
}