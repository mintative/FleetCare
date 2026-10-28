import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../../stores/AuthStore';


interface Props {
  biometricOnly?: boolean;
}

const LoginScreen = observer(({ biometricOnly = false }: Props) => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('123456');

  const handleLogin = async () => {
    await authStore.login(email, password);
  };

  const handleBiometricLogin = async () => {
    await authStore.loginWithBiometrics();
  };


    console.log('Biometrics enabled:', authStore.isBiometricsEnabled);
    console.log('Biometrics available:', authStore.isBiometricsAvailable);
    console.log('Requires biometrics:', authStore.requiresBiometrics);
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 26, marginBottom: 24 }}>
        Authorization
      </Text>

      {!biometricOnly && (
        <>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!authStore.isLoading}
            style={{ borderWidth: 1, padding: 12, marginBottom: 12 }}
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!authStore.isLoading}
            style={{ borderWidth: 1, padding: 12, marginBottom: 12 }}
          />

          <Button
            title="Login"
            onPress={handleLogin}
            disabled={authStore.isLoading}
          />
        </>
      )}

      {authStore.isBiometricsEnabled &&
        authStore.isBiometricsAvailable && (
          <View style={{ marginTop: 16 }}>
            <Button
              title="Login with biometrics"
              onPress={handleBiometricLogin}
              disabled={authStore.isLoading}
            />
          </View>
        )}

      {authStore.isLoading && <ActivityIndicator style={{ marginTop: 16 }} />}

      {authStore.error && (
        <Text style={{ color: 'red', marginTop: 16 }}>
          {authStore.error}
        </Text>
      )}
    </View>
  );
});

export default LoginScreen;