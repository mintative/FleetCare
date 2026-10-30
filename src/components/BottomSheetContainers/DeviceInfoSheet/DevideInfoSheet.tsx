import { useEffect, useState } from "react";
import { Button, Pressable, ScrollView, View } from "react-native";
import { AppText } from "../../AppText";
import { styles } from "./styles";
import { PlainText } from "../../PlainText";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useLanguage } from "../../../localization/LangContext";
import { useTheme } from "../../../theme/ThemeContext";
import CheckIcon from "../../../assets/icons/check.svg";
import DeviceInfo from 'react-native-device-info';
import { useTranslation } from "react-i18next";

type Props = {
  onClose: ()=>void;
}

type DeviceInfoState = {
  deviceModel: string;
  osVersion: string;
  appVersion: string;
  shortDeviceId: string;
  lastSync: string;
};

export const DeviceInfoSheet =({onClose}: Props)=> {
  const [deviceDetails, setDeviceDetails] = useState<DeviceInfoState>({
    deviceModel: "Loading...",
    osVersion: "Loading...",
    appVersion: "Loading...",
    shortDeviceId: "Loading...",
    lastSync: "",
  });
  
  const {currentLanguage, changeLanguage} = useLanguage();
  const  {theme} = useTheme();
  const {t} = useTranslation();

  const [error, setError] = useState<string>("");


  useEffect(()=>{
    const fetchDeviceInfo = async () => {
      const deviceName = await DeviceInfo.getDeviceName();

      const systemName = DeviceInfo.getSystemName();
      const systemVersion = DeviceInfo.getSystemVersion();

      const version = DeviceInfo.getVersion();
      const buildNumber = DeviceInfo.getBuildNumber();

      const rawUniqueId = await DeviceInfo.getUniqueId();
      const cleanId = rawUniqueId.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
      const shortDeviceId = cleanId.length >= 10
          ? `${cleanId.slice(0, 2)}-${cleanId.slice(2, 6)}-${cleanId.slice(6, 10)}`
          : rawUniqueId;

      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const lastSync = `Today, ${hours}:${minutes}`;

      setDeviceDetails({
          deviceModel: deviceName,
          osVersion: `${systemName} ${systemVersion}`,
          appVersion: `${version} (${buildNumber})`,
          shortDeviceId,
          lastSync,
        });
    }
    fetchDeviceInfo();
  }, []);

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
        {t("profile.deviceInfo")}
      </AppText>

      

      <View style={[styles.listContainer, {backgroundColor: theme.card}]}>
        <View style={styles.item}>
          <PlainText style={styles.leftText}>{t("profile.device")}</PlainText>
          <AppText style={styles.rightText}>{deviceDetails.deviceModel}</AppText>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.item}>
          <PlainText style={styles.leftText}>{t("profile.os")}</PlainText>
          <AppText style={styles.rightText}>{deviceDetails.osVersion}</AppText>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.item}>
          <PlainText style={styles.leftText}>{t("profile.appVersion")}</PlainText>
          <AppText style={styles.rightText}>{deviceDetails.appVersion}</AppText>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.item}>
          <PlainText style={styles.leftText}>{t("profile.deviceId")}</PlainText>
          <AppText style={styles.rightText}>{deviceDetails.shortDeviceId}</AppText>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.item}>
          <PlainText style={styles.leftText}>{t("profile.lastSync")}</PlainText>
          <AppText style={styles.rightText}>{deviceDetails.lastSync}</AppText>
        </View>

      </View>


      </BottomSheetScrollView>
    </View>
  );
}