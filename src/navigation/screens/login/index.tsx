import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
  Pressable,
  AlertButtonStyle,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../../stores/AuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { AppText } from '../../../components/AppText';
import { FormButton } from '../../../components/FormButton';
import CustomField from '../../../components/CustomField';
import ReactNativeBiometrics from 'react-native-biometrics';
import { useTranslation } from 'react-i18next';



interface Props {
  biometricOnly?: boolean;
}

const LoginScreen = observer(({ biometricOnly = false }: Props) => {
  const {t} = useTranslation();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('123456');
  


  const handleLogin = async () => {
    
    const success = await authStore.login(email, password);
    
    if (success) {

      const rnBiometrics = new ReactNativeBiometrics();
      const { available } = await rnBiometrics.isSensorAvailable();
      
      if (available && !authStore.isBiometricsEnabled) {

        setTimeout(() => {
          Alert.alert(
            t("biometricsAlert.title"),
            t("biometricsAlert.description"),
            [
              { text: t("common.no"), style: t("common.cancel") as AlertButtonStyle},
              { 
                text: t("common.enable"), 
                onPress: async () => {
                  await authStore.enableBiometrics();
                } 
              }
            ]
          );
        }, 600);
      }
    }
  };

  const handleBiometricLogin = async () => {
    await authStore.loginWithBiometrics();
  };


    console.log('Biometrics enabled:', authStore.isBiometricsEnabled);
    console.log('Biometrics available:', authStore.isBiometricsAvailable);
    console.log('Requires biometrics:', authStore.requiresBiometrics);
  return (
    <ScreenContainer style={styles.container}>
      <AppText style={styles.title}>
        {t("login.title")}
      </AppText>

      {!biometricOnly && (
        <View style={{marginTop:20}}>
          <CustomField
            type="text"
            label={t("login.lables.email")}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            containerStyle={styles.input}
          />

          <CustomField
            type="password"
            label={t("login.lables.password")}
            value={password}
            onChangeText={setPassword}
            placeholder="********"
            containerStyle={styles.input}
          />

          <FormButton
            onPress={handleLogin}
            disable={authStore.isLoading}
            style={styles.button}
          >
            <AppText style={{color: "#fff", fontSize: 22}}>{t("login.loginButton")}</AppText>
          </FormButton>
        </View>
      )}

      {authStore.isBiometricsEnabled &&
        authStore.isBiometricsAvailable && (
          <View style={{ marginTop: 16 }}>
            <FormButton
              onPress={handleBiometricLogin}
              disable={authStore.isLoading}
              style={styles.button}
            >
              <AppText style={{color: "#fff", fontSize: 22}}>{t("login.loginWithBiometrics")}</AppText>
            </FormButton>
          </View>
        )}

      {authStore.isLoading && <ActivityIndicator style={{ marginTop: 16 }} />}

      {authStore.error && (
        <AppText style={{ color: 'red', marginTop: 16 }}>
          {authStore.error}
        </AppText>
      )}
    </ScreenContainer>
  );
});

export default LoginScreen;