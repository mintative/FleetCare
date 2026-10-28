import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { MaintenanceStackParamList } from '../types';
import MaintenanceScreen from '../screens/maintenance';


const Stack = createNativeStackNavigator<MaintenanceStackParamList>();

export default function MaintenanceStack() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="MaintenanceMain"
        component={MaintenanceScreen}
      />

    </Stack.Navigator>
  );
}