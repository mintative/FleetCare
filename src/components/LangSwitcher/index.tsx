import { Pressable, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { ThemeMode, useTheme } from "../../theme/ThemeContext";
import { AppText } from "../AppText";
import { PlainText } from "../PlainText";
import LangIcon from "../../assets/icons/lang.svg";
import NextIcon from "../../assets/icons/next-arrow.svg";
import { useLanguage } from "../../localization/LangContext";

type Props = {
    onPress: ()=>void;
}

export const LangSwitcher = ({onPress} : Props) => {
    const {theme, themeMode, setThemeMode} = useTheme();

    const {currentLanguage} = useLanguage();

    const options: ThemeMode[] = ["light", "dark", "system"];

    function getCurrentLanguage (lang: string) {
        if (lang === "en") {
            return "English"
        } else if (lang === "pl") {
            return "Polski"
        } else if (lang === "uk") {
            return "Українська"
        } else {
            return ""
        }
    }

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <PlainText style={styles.title}>Language</PlainText>

            <View style={[styles.buttonContainer, {backgroundColor: theme.card}]}>
                <View style={styles.left}>
                    <View style={[styles.icon, {backgroundColor: theme.background}]}>
                        <LangIcon width={30} height={30} color={theme.text} />
                    </View>
                    <AppText style={styles.buttonTitle}>Language</AppText>
                </View>
                <View style={styles.right}>
                    <PlainText style={styles.lang}>{getCurrentLanguage(currentLanguage)}</PlainText>
                    <View>
                        <NextIcon width={25} height={25} color={"#666666"}/>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}