import { Pressable, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { ThemeMode, useTheme } from "../../theme/ThemeContext";
import { AppText } from "../AppText";
import { PlainText } from "../PlainText";
import PhoneIcon from "../../assets/icons/phone.svg";
import NextIcon from "../../assets/icons/next-arrow.svg";

type Props = {
    onPress: ()=>void;
}

export const AppSettings = ({onPress}: Props) => {
    const {theme, themeMode, setThemeMode} = useTheme();


    const options: ThemeMode[] = ["light", "dark", "system"];

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <PlainText style={styles.title}>Application</PlainText>

            <View style={[styles.buttonContainer, {backgroundColor: theme.card}]}>
                <View style={styles.left}>
                    <View style={[styles.icon, {backgroundColor: theme.background}]}>
                        <PhoneIcon width={25} height={25} color={theme.text} />
                    </View>
                    <AppText style={styles.buttonTitle}>Device information</AppText>
                </View>
                <View style={styles.right}>

                    <View>
                        <NextIcon width={25} height={25} color={"#666666"}/>
                    </View>
                </View>
            </View>
        </Pressable>
    );
}