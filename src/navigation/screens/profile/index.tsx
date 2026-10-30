import { View, Text, Button, ScrollView } from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ProfileStackParamList } from '../../types';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Header } from '../../../components/Header';
import { ProfileInfo } from '../../../components/ProfileInfo';
import { ThemeSwitcher } from '../../../components/ThemeSwitcher';
import { LangSwitcher } from '../../../components/LangSwitcher';
import { SecuritySwitcher } from '../../../components/SecuritySwitcher';
import { AppSettings } from '../../../components/AppSettings';
import { LogoutButton } from '../../../components/LogoutButton';
import BottomSheet, { BottomSheetRef } from '../../../components/BottomSheet';
import { useRef } from 'react';
import { LanguageSheet } from '../../../components/BottomSheetContainers/LanguageSheet/LanguageSheet';
import { DeviceInfoSheet } from '../../../components/BottomSheetContainers/DeviceInfoSheet/DevideInfoSheet';
import { LogoutSheet } from '../../../components/BottomSheetContainers/LogoutSheet/LogoutSheet';
import { NetworkInfoSheet } from '../../../components/BottomSheetContainers/NetworkInfoSheet/NetworkInfoSheet';
import { GeolocationSheet } from '../../../components/BottomSheetContainers/GeolocationSheet/GeolocationSheet';
import { useTranslation } from 'react-i18next';



type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileMain'>;

export default function ProfileScreen({ navigation }: Props) {
  const languageSheetRef = useRef<BottomSheetRef>(null);
  const deviceInfoSheetRef = useRef<BottomSheetRef>(null);
  const networkInfoSheetRef = useRef<BottomSheetRef>(null);
  const geolocationSheetRef = useRef<BottomSheetRef>(null);
  const logoutSheetRef = useRef<BottomSheetRef>(null);

  const {t} = useTranslation();

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={{padding:20}} style={{}}>
        <Header 
            title={t("profile.title")}
        />
        <ProfileInfo/>
        <ThemeSwitcher />
        <LangSwitcher onPress={() => languageSheetRef.current?.open()}/>
        <SecuritySwitcher />
        <AppSettings 
        onDeviceInfoPress={() => deviceInfoSheetRef.current?.open()} 
        onNetworkInfoPress={() => networkInfoSheetRef.current?.open()} 
        onGeolocationPress={() => geolocationSheetRef.current?.open()} 
        />
        <LogoutButton onPress={() => logoutSheetRef.current?.open()} />
      </ScrollView>
      
      <BottomSheet
        ref={languageSheetRef}
        snapPoints={['50%']}
      >
        <LanguageSheet onClose={() => languageSheetRef.current?.close()} />
      </BottomSheet>
      <BottomSheet
        ref={deviceInfoSheetRef}
        snapPoints={['50%']}
      >
        <DeviceInfoSheet onClose={() => deviceInfoSheetRef.current?.close()} />
      </BottomSheet>
      <BottomSheet
        ref={networkInfoSheetRef}
        snapPoints={['35%']}
      >
        <NetworkInfoSheet onClose={() => networkInfoSheetRef.current?.close()} />
      </BottomSheet>
      <BottomSheet
        ref={geolocationSheetRef}
        snapPoints={['30%']}
      >
        <GeolocationSheet onClose={() => geolocationSheetRef.current?.close()} />
      </BottomSheet>
      <BottomSheet
        ref={logoutSheetRef}
        snapPoints={['35%']}
      >
        <LogoutSheet onClose={() => logoutSheetRef.current?.close()} />
      </BottomSheet>
        
    </ScreenContainer>
  );
}