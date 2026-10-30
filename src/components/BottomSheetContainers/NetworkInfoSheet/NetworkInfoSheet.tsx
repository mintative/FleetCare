import { useEffect, useState } from "react";
import { View } from "react-native";
import { AppText } from "../../AppText";
import { styles } from "./styles";
import { PlainText } from "../../PlainText";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import { useTheme } from "../../../theme/ThemeContext";
import { useNetInfo } from '@react-native-community/netinfo';


type Props = {
  onClose: ()=>void;
}
export const NetworkInfoSheet =({onClose}: Props)=> {
  const netInfo = useNetInfo();

  const  {theme} = useTheme();

  return (
    <View style={styles.container}>
      <BottomSheetScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <AppText style={styles.title}>
        Network status
      </AppText>

      

      <View style={[styles.listContainer, {backgroundColor: theme.card}]}>
        <View style={styles.item}>
          <PlainText style={styles.leftText}>Network type</PlainText>
          <AppText style={styles.rightText}>{netInfo.type}</AppText>
        </View>
        <View style={styles.item}>
          <PlainText style={styles.leftText}>Is connected</PlainText>
          <AppText style={styles.rightText}>{netInfo.isConnected ? "Yes" : "No"}</AppText>
        </View>
        <View style={styles.item}>
          <PlainText style={styles.leftText}>Is Internet reachable</PlainText>
          <AppText style={styles.rightText}>{netInfo.isInternetReachable ? "Yes" : "No"}</AppText>
        </View>
      </View>


      </BottomSheetScrollView>
    </View>
  );
}