
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { VehiclesStackParamList } from '../types';
import { VehiclesScreen } from '../screens/vehicles';
import { VehicleDetails } from '../screens/vehicleDetails';


const Stack = createNativeStackNavigator<VehiclesStackParamList>();

export default function VehiclesStack() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="VehiclesMain"
        component={VehiclesScreen}
      />
      <Stack.Screen
        name="VehicleDetails"
        component={VehicleDetails}
      />

    </Stack.Navigator>
  );
}
