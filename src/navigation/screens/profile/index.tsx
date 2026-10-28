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

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileMain'>;

export default function ProfileScreen({ navigation }: Props) {
  return (
    <ScreenContainer>
      <ScrollView style={{padding:20, paddingBottom:40}}>
        <Header 
            title="Profile"
        />
        <ProfileInfo/>
        <ThemeSwitcher />
        <LangSwitcher />
        <SecuritySwitcher />
        <AppSettings />
      </ScrollView>
        
    </ScreenContainer>
  );
}