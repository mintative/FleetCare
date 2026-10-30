import { ReactNode } from "react"
import { Pressable, StyleProp, ViewStyle } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import LogoutIcon from "../../assets/icons/logout.svg";
import { AppText } from "../AppText";
import { colors } from "../../theme/colors";
import { useTranslation } from "react-i18next";

type Props = {
    onPress: ()=>void;
}

export const LogoutButton = ({onPress}: Props) => {
    const {t} = useTranslation();
    return (
        <Pressable
        onPress={onPress}
            style={styles.button}
        >
            <LogoutIcon width={30} height={30} color={colors.redLight}/>
            <AppText style={styles.text}>{t("profile.logoutButton")}</AppText>
        </Pressable>
    )
}


const styles = EStyleSheet.create({
    button: {
        padding:15,
        backgroundColor: colors.redDark,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        borderRadius: 999,
        marginTop: 30,
        borderWidth:1,
        borderColor: colors.redDark,
    },
    text: {
        color: colors.redLight,
        fontSize: 20,
        fontWeight: "bold"
    }
});