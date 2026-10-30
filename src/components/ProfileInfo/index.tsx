import { View } from "react-native";
import ProfileIcon from "../../assets/icons/profile.svg";
import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../theme/colors";
import { AppText } from "../AppText";
import { authStore } from "../../stores/AuthStore";
import { PlainText } from "../PlainText";
import { useTheme } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";


export const ProfileInfo = () => {
    const {theme} = useTheme();
    const {t} = useTranslation();

    return (
        <View style={[styles.container, {backgroundColor:theme.card}]}>
            <View style={styles.iconContainer} >
                <ProfileIcon color="#fff"/>
            </View>
            <View>
                <AppText style={styles.email}>{authStore.user?.email}</AppText>
                <PlainText style={styles.role}>{t("profile.role")}</PlainText>
            </View>
        </View>
    )
}


const styles = EStyleSheet.create({
    container: {
        padding:20,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 20,
        marginTop: 20,

        flexDirection: "row",
        alignItems: "center",
        gap: 20
    },
    iconContainer: {
        padding:15,
        backgroundColor: "$primaryColor",
        alignSelf: "flex-start",
        borderRadius: 999
    },
    email: {
        fontSize: 20,
        fontWeight: "bold"
    },
    role: {
        marginTop: 5
    }

});