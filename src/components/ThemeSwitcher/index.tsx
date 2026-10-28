import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { ThemeMode, useTheme } from "../../theme/ThemeContext";
import { AppText } from "../AppText";
import { PlainText } from "../PlainText";
import SunIcon from "../../assets/icons/sun.svg";
import MoonIcon from "../../assets/icons/moon.svg";
import SystemIcon from "../../assets/icons/pc.svg";

export const ThemeSwitcher = () => {
    const {theme, themeMode, setThemeMode} = useTheme();


    const options: ThemeMode[] = ["light", "dark", "system"];

    return (
        <View style={styles.container}>
            <PlainText style={styles.title}>Appearance</PlainText>

            <View style={[styles.segmentedContainer, {backgroundColor: theme.card}]}>
            {options.map(option => {
                const isActive = themeMode === option;

                return (
                <TouchableOpacity
                    key={option}
                    activeOpacity={0.8}
                    onPress={() => setThemeMode(option)}
                    style={[
                    styles.segment,
                    
                    isActive && [styles.activeSegment, {backgroundColor: theme.background}],
                    ]}
                >
                    <View>
                    {option === "light" ? <SunIcon width={20} height={20} color={theme.text}/> 
                    : option === "dark" ? <MoonIcon width={20} height={20} color={theme.text}/>
                    : option === "system" ? <SystemIcon width={20} height={20} color={theme.text}/>
                    : ""}
                    </View>
                    
                    <AppText
                    style={[
                        styles.segmentText,
                        {color:theme.text},
                        isActive && [styles.activeSegmentText, {color: theme.text}],
                    ]}
                    >
                    
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                    </AppText>
                </TouchableOpacity>
                );
            })}
            </View>
        </View>
    );
}