import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { PrivateTabParamList } from '../types';

import HomeStack from './home';

import VehiclesStack from './vehicles';
import MaintenanceStack from './maintenance';
import ProfileStack from './profile';

import HomeIcon from '../../assets/icons/home.svg';

import VehiclesIcon from '../../assets/icons/vehicles.svg';
import MaintenanceIcon from '../../assets/icons/maintenance.svg';
import ProfileIcon from '../../assets/icons/profile.svg';
import { useTheme } from '../../theme/ThemeContext';
import { CopilotStep } from 'react-native-copilot';
import { CopilotTouchableOpacity } from '../../components/Walkthroughables';

const Tab = createBottomTabNavigator<PrivateTabParamList>();


export default function PrivateTabs() {
  const insets = useSafeAreaInsets();
  const {theme} = useTheme();
  
  const COLORS = {
    active: '#2563EB',
    inactive: '#9CA3AF',
    background: theme.card,
    border: theme.background,
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: COLORS.active,
        tabBarInactiveTintColor: COLORS.inactive,

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 4,
        },

        tabBarItemStyle: {
          paddingVertical: 4,
        },

        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingTop: 6,
          paddingBottom: Math.max(insets.bottom, 6),

          backgroundColor: COLORS.background,

          borderTopWidth: 1,
          borderTopColor: COLORS.border,

          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <HomeIcon
              width={24}
              height={24}
              color={color}
              opacity={focused ? 1 : 0.8}
            />
          ),
          tabBarButton: (props) => (
            <CopilotStep
              text="Your home screen"
              order={2}
              name="homeTab"
            >
              <CopilotTouchableOpacity
                {...props}
                collapsable={false}
                style={[props.style, { flex: 1 }]}
              >
                {props.children}
              </CopilotTouchableOpacity>
            </CopilotStep>
          ),
        }}
      />
        <Tab.Screen
        name="Vehicles"
        component={VehiclesStack}
        options={{
          title: 'Vehicles',
          tabBarLabel: 'Vehicles',
          tabBarIcon: ({ color, focused }) => (
            <VehiclesIcon
              width={24}
              height={24}
              color={color}
              opacity={focused ? 1 : 0.8}
            />
          ),
          tabBarButton: (props) => (
            <CopilotStep
              text="Your vehicles"
              order={3}
              name="vehiclesTab"
            >
              <CopilotTouchableOpacity
                {...props}
                collapsable={false}
                style={[props.style, { flex: 1 }]}
              >
                {props.children}
              </CopilotTouchableOpacity>
            </CopilotStep>
          ),
        }}
      />
      <Tab.Screen
        name="Maintenance"
        component={MaintenanceStack}
        options={{
          title: 'Maintenance',
          tabBarLabel: 'Service',
          tabBarIcon: ({ color, focused }) => (
            <MaintenanceIcon
              width={24}
              height={24}
              color={color}
              opacity={focused ? 1 : 0.8}
            />
          ),
          tabBarButton: (props) => (
            <CopilotStep
              text="Your repairs"
              order={4}
              name="maintenanceTab"
            >
              <CopilotTouchableOpacity
                {...props}
                collapsable={false}
                style={[props.style, { flex: 1 }]}
              >
                {props.children}
              </CopilotTouchableOpacity>
            </CopilotStep>
          ),
        }}
      />
      

      

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <ProfileIcon
              width={24}
              height={24}
              color={color}
              opacity={focused ? 1 : 0.8}
            />
          ),
          tabBarButton: (props) => (
            <CopilotStep
              text="Your profile"
              order={5}
              name="profileTab"
            >
              <CopilotTouchableOpacity
                {...props}
                collapsable={false}
                style={[props.style, { flex: 1 }]}
              >
                {props.children}
              </CopilotTouchableOpacity>
            </CopilotStep>
          ),
        }}
      />
    </Tab.Navigator>
  );
}