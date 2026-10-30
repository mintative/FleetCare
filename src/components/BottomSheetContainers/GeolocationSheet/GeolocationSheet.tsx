import { useEffect, useState } from "react";
import { PermissionsAndroid, Platform, View } from "react-native";
import { AppText } from "../../AppText";
import { styles } from "./styles";
import { PlainText } from "../../PlainText";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import { useTheme } from "../../../theme/ThemeContext";

import Geolocation from '@react-native-community/geolocation';
import { useTranslation } from "react-i18next";

type Props = {
  onClose: ()=>void;
}

type LocationState = {
  latitude: number;
  longitude: number;
}


export const GeolocationSheet =({onClose}: Props)=> {
  const [location, setLocation]  = useState<LocationState | null>(null);
  const [error, setError] = useState<string | null>(null);



  const  {theme} = useTheme();
  const {t} = useTranslation();


  useEffect(()=>{
    getCurrentLocation();
  }, []);

  const requestLocationPermission = async (): Promise<boolean> =>  {
    if (Platform.OS === "ios") {
      return true;
    }

    try{
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Permission for location access",
          message: "We need access to your location",
          buttonNeutral: 'Ask later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    catch {
      return false;
    }
  }

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      setError("Permission denied");
      return
    }

    Geolocation.getCurrentPosition(position=>{
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      setError(null);
    },
      error=>{
        setError(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      });
  }


  return (
    <View style={styles.container}>
      <BottomSheetScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <AppText style={styles.title}>
        {t("profile.geolocation")}
      </AppText>

      
      {location && 
        <View style={[styles.listContainer, {backgroundColor: theme.card}]}>
          <View style={styles.item}>
            <PlainText style={styles.leftText}>{t("profile.latitude")}</PlainText>
            <AppText style={styles.rightText}>{location.latitude}</AppText>
          </View>
          <View style={styles.item}>
            <PlainText style={styles.leftText}>{t("profile.longitude")}</PlainText>
            <AppText style={styles.rightText}>{location.longitude}</AppText>
          </View>
        </View>
      }
      {error && <AppText style={styles.error}>Error: {error}</AppText>}
      


      </BottomSheetScrollView>
    </View>
  );
}