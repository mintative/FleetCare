
import { AppText } from "../../AppText";
import { styles } from "./styles";

import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useTheme } from "../../../theme/ThemeContext";
import { Pressable, View } from "react-native";
import BucketIcon from "../../../assets/icons/bucket.svg";
import { colors } from "../../../theme/colors";
import { PlainText } from "../../PlainText";
import { useTranslation } from "react-i18next";


type Props = {
  onClose: ()=>void;
  onConfirm: ()=>void;
  title: string;
  description?: string;
}

export const DeleteSheet =({onClose, onConfirm, title, description}: Props)=> {
  
  const  {theme} = useTheme();
  const {t}  = useTranslation();

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
          <BucketIcon width={30} height={30} color={colors.redDark} />
        </View>
        <View>
          <AppText style={styles.title}>
          {title}
        </AppText>
        {description && <PlainText>{description}</PlainText>}
        
        </View>
      </View>
      

      <View style={styles.actions}>
          <Pressable
            style={styles.logout}
            onPress={onConfirm}
          >
            <AppText style={styles.logoutText}>{t("common.remove")}</AppText>
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