
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InspectionsStackParamList } from '../types';
import InspectionsScreen from '../screens/inspections';



const Stack = createNativeStackNavigator<InspectionsStackParamList>();

export default function InspectionsStack() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="InspectionsMain"
        component={InspectionsScreen}
      />

    </Stack.Navigator>
  );
}
