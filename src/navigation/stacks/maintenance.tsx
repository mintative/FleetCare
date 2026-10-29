import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { MaintenanceStackParamList } from '../types';
import { MaintenanceScreen } from '../screens/maintenance';
import { AddRepairScreen } from '../screens/addRepair';
import { EditRepairScreen } from '../screens/editRepair';



const Stack = createNativeStackNavigator<MaintenanceStackParamList>();

export default function MaintenanceStack() {
  return (
    <Stack.Navigator
    initialRouteName='MaintenanceMain'
     screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="MaintenanceMain"
        component={MaintenanceScreen}
      />
      <Stack.Screen
        name="AddRepair"
        component={AddRepairScreen}
      />
      <Stack.Screen
        name="EditRepair"
        component={EditRepairScreen}
      />

    </Stack.Navigator>
  );
}