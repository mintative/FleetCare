import { Switch, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { ThemeMode, useTheme } from "../../theme/ThemeContext";
import { AppText } from "../AppText";
import { PlainText } from "../PlainText";
import BiometricsIcon from "../../assets/icons/biometrics.svg";
import NextIcon from "../../assets/icons/next-arrow.svg";
import { authStore } from "../../stores/AuthStore";
import { observer } from "mobx-react-lite";

export const SecuritySwitcher = observer(() => {
    const {theme, themeMode, setThemeMode} = useTheme();


    const options: ThemeMode[] = ["light", "dark", "system"];


    const handleToggle = async () => {
        await authStore.toggleBiometrics();
    };
    if (!authStore.isBiometricsAvailable) {
        return null;
    }

    return (
        <View style={styles.container}>
            <PlainText style={styles.title}>Security</PlainText>

            <View style={[styles.buttonContainer, {backgroundColor: theme.card}]}>
                <View style={styles.left}>
                    <View style={[styles.icon, {backgroundColor: theme.background}]}>
                        <BiometricsIcon width={30} height={30} color={theme.text} />
                    </View>
                    <AppText style={styles.buttonTitle}>Face ID / Touch ID</AppText>
                </View>
                <View style={styles.right}>
                    <Switch
                        trackColor={{ false: "#767577", true: theme.primary || "#81b0ff" }}
                        thumbColor={authStore.isBiometricsEnabled ? "#ffffff" : "#f4f3f4"}
                        ios_backgroundColor="#666666"
                        onValueChange={handleToggle}
                        value={authStore.isBiometricsEnabled}
                    />
                </View>
            </View>
        </View>
    );
});