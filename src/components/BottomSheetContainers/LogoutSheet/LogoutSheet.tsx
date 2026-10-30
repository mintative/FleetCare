
import { AppText } from "../../AppText";
import { styles } from "./styles";

import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useTheme } from "../../../theme/ThemeContext";
import { Pressable, View } from "react-native";
import LogoutIcon from "../../../assets/icons/logout.svg";
import { colors } from "../../../theme/colors";
import { PlainText } from "../../PlainText";
import { authStore } from "../../../stores/AuthStore";
import { useTranslation } from "react-i18next";

type Props = {
  onClose: ()=>void;
}

export const LogoutSheet =({onClose}: Props)=> {
  
  const  {theme} = useTheme();
  const {t} = useTranslation();

  const logout = () => {
    authStore.logout();
  }
  const cancel = () => {
    onClose();
  }
  
  return (
    <View style={styles.container}>
      <BottomSheetScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.row}>
        <View style={styles.icon}>
          <LogoutIcon width={30} height={30} color={colors.redDark} />
        </View>
        <View>
          <AppText style={styles.title}>
          {t("profile.logoutTitle")}
        </AppText>
        <PlainText>{t("profile.logoutDescription")}</PlainText>
        </View>
      </View>
      

      <View style={styles.actions}>
          <Pressable
            style={styles.logout}
            onPress={logout}
          >
            <AppText style={styles.logoutText}>{t("profile.logoutButton")}</AppText>
          </Pressable>
          <Pressable
            style={styles.cancel}
            onPress={cancel}
          >
            <AppText style={styles.cancelText}>{t("common.cancel")}</AppText>
          </Pressable>
      </View>


      </BottomSheetScrollView>
    </View>
  );
}