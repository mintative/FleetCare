import { useState } from "react";
import { Button, Pressable, ScrollView, View } from "react-native";
import { AppText } from "../../AppText";
import { styles } from "./styles";
import { PlainText } from "../../PlainText";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useLanguage } from "../../../localization/LangContext";
import { useTheme } from "../../../theme/ThemeContext";
import CheckIcon from "../../../assets/icons/check.svg";

type Props = {
  onClose: ()=>void;
}

export const LanguageSheet =({onClose}: Props)=> {
  
  const {currentLanguage, changeLanguage} = useLanguage();
  const  {theme} = useTheme();


  const [error, setError] = useState<string>("");

  const onChoose = (lang: string) => {
    changeLanguage(lang);
    onClose();
  }


  return (
    <View style={styles.container}>
      <BottomSheetScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <AppText style={styles.title}>
        Language
      </AppText>

      <PlainText style={styles.description}>
        Choose the language used across FleetCare.
      </PlainText>

      

      <View style={styles.listContainer}>
        <Pressable onPress={()=>onChoose("en")} style={[styles.buttonContainer, {backgroundColor:theme.card}]}>
          <View style={styles.leftPart}>
            <View style={[styles.icon, {backgroundColor: theme.background}]}>
              <AppText style={styles.firstLetters}>EN</AppText>
            </View>
            <View style={styles.langInfo}>
                <AppText style={styles.lang}>English</AppText>
                <PlainText style={styles.langPar}>English (US)</PlainText>
            </View>
          </View>
          <View style={styles.rightPart}>
          {currentLanguage === "en" && (
            <View style={styles.checkIcon}>
              <CheckIcon width={20} height={20} color={theme.primary} /> 
            </View>
            
          )}
        </View>
        </Pressable>
        <Pressable onPress={()=>onChoose("pl")} style={[styles.buttonContainer, {backgroundColor:theme.card}]}>
          <View style={styles.leftPart}>
            <View style={[styles.icon, {backgroundColor: theme.background}]}>
              <AppText style={styles.firstLetters}>PL</AppText>
            </View>
            <View style={styles.langInfo}>
                <AppText style={styles.lang}>Polski</AppText>
                <PlainText style={styles.langPar}>Polish</PlainText>
            </View>
          </View>
          <View style={styles.rightPart}>
          {currentLanguage === "pl" && (
            <View style={styles.checkIcon}>
              <CheckIcon width={20} height={20} color={theme.primary} /> 
            </View>
            
          )}
        </View>
        </Pressable>
        <Pressable onPress={()=>onChoose("uk")} style={[styles.buttonContainer, {backgroundColor:theme.card}]}>
          <View style={styles.leftPart}>
            <View style={[styles.icon, {backgroundColor: theme.background}]}>
              <AppText style={styles.firstLetters}>UA</AppText>
            </View>
            <View style={styles.langInfo}>
                <AppText style={styles.lang}>Українська</AppText>
                <PlainText style={styles.langPar}>Ukrainian</PlainText>
            </View>
          </View>
          <View style={styles.rightPart}>
          {currentLanguage === "uk" && (
            <View style={styles.checkIcon}>
              <CheckIcon width={20} height={20} color={theme.primary} /> 
            </View>
            
          )}
        </View>
        </Pressable>
      </View>


      </BottomSheetScrollView>
    </View>
  );
}