import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { PublicStackParamList } from '../types';
import { authStore } from '../../stores/AuthStore';

import LoginScreen from '../screens/login';
import { observer } from 'mobx-react-lite';



const Stack = createNativeStackNavigator<PublicStackParamList>();

export const PublicStack = observer(() => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login">
        {() => (
          <LoginScreen
            biometricOnly={authStore.requiresBiometrics}
          />
        )}
      </Stack.Screen>

    </Stack.Navigator>
  );
});