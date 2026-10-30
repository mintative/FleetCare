import { Pressable, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { ThemeMode, useTheme } from "../../theme/ThemeContext";
import { AppText } from "../AppText";
import { PlainText } from "../PlainText";
import PhoneIcon from "../../assets/icons/phone.svg";
import NextIcon from "../../assets/icons/next-arrow.svg";
import NetworkIcon from "../../assets/icons/wifi.svg";
import GeolocationIcon from "../../assets/icons/geolocation.svg";
import { useTranslation } from "react-i18next";

type Props = {
    onDeviceInfoPress: ()=>void;
    onNetworkInfoPress: ()=>void;
    onGeolocationPress: ()=>void;
}

export const AppSettings = ({onDeviceInfoPress,onNetworkInfoPress, onGeolocationPress }: Props) => {
    const {theme, themeMode, setThemeMode} = useTheme();
    const {t} = useTranslation();



    return (
        
        <View  style={styles.container}>
            <PlainText style={styles.title}>{t("profile.application")}</PlainText>

            <Pressable onPress={onDeviceInfoPress} style={[styles.buttonContainer, {backgroundColor: theme.card}]}>
                <View style={styles.left}>
                    <View style={[styles.icon, {backgroundColor: theme.background}]}>
                        <PhoneIcon width={25} height={25} color={theme.text} />
                    </View>
                    <AppText style={styles.buttonTitle}>{t("profile.deviceInfo")}</AppText>
                </View>
                <View style={styles.right}>

                    <View>
                        <NextIcon width={25} height={25} color={"#666666"}/>
                    </View>
                </View>
            </Pressable>
            <Pressable onPress={onNetworkInfoPress} style={[styles.buttonContainer, {backgroundColor: theme.card}]}>
                <View style={styles.left}>
                    <View style={[styles.icon, {backgroundColor: theme.background}]}>
                        <NetworkIcon width={25} height={25} color={theme.text} />
                    </View>
                    <AppText style={styles.buttonTitle}>{t("profile.networkStatus")}</AppText>
                </View>
                <View style={styles.right}>

                    <View>
                        <NextIcon width={25} height={25} color={"#666666"}/>
                    </View>
                </View>
            </Pressable>
            <Pressable onPress={onGeolocationPress} style={[styles.buttonContainer, {backgroundColor: theme.card}]}>
                <View style={styles.left}>
                    <View style={[styles.icon, {backgroundColor: theme.background}]}>
                        <GeolocationIcon width={25} height={25} color={theme.text} />
                    </View>
                    <AppText style={styles.buttonTitle}>{t("profile.geolocation")}</AppText>
                </View>
                <View style={styles.right}>
                    <View>
                        <NextIcon width={25} height={25} color={"#666666"}/>
                    </View>
                </View>
            </Pressable>
        </View>
    );
}