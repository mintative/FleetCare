import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { ProfileStackParamList } from '../types';
import ProfileScreen from '../screens/profile';


const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
      />

    </Stack.Navigator>
  );
}
