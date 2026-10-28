import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { ThemeMode, useTheme } from "../../theme/ThemeContext";
import { AppText } from "../AppText";
import { PlainText } from "../PlainText";
import LangIcon from "../../assets/icons/lang.svg";
import NextIcon from "../../assets/icons/next-arrow.svg";

export const LangSwitcher = () => {
    const {theme, themeMode, setThemeMode} = useTheme();


    const options: ThemeMode[] = ["light", "dark", "system"];

    return (
        <View style={styles.container}>
            <PlainText style={styles.title}>Language</PlainText>

            <View style={[styles.buttonContainer, {backgroundColor: theme.card}]}>
                <View style={styles.left}>
                    <View style={[styles.icon, {backgroundColor: theme.background}]}>
                        <LangIcon width={30} height={30} color={theme.text} />
                    </View>
                    <AppText style={styles.buttonTitle}>Language</AppText>
                </View>
                <View style={styles.right}>
                    <PlainText style={styles.lang}>English</PlainText>
                    <View>
                        <NextIcon width={25} height={25} color={"#666666"}/>
                    </View>
                </View>
            </View>
        </View>
    );
}