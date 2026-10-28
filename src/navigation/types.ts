import type { NavigatorScreenParams } from '@react-navigation/native';

export type PublicStackParamList = {
  Login: {biometricsOnly?:boolean};
};


export type HomeStackParamList = {
  HomeMain: undefined;
};

export type InspectionsStackParamList = {
  InspectionsMain: undefined;
};

export type VehiclesStackParamList = {
  VehiclesMain: undefined;
  VehicleDetails: {vehicleId: string};
};

export type MaintenanceStackParamList = {
  MaintenanceMain: undefined;
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
};

export type PrivateTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Inspections: NavigatorScreenParams<InspectionsStackParamList>;
  Vehicles: NavigatorScreenParams<VehiclesStackParamList>;
  Maintenance: NavigatorScreenParams<MaintenanceStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

export type RootStackParamList = {
  Public: NavigatorScreenParams<PublicStackParamList>;
  Private: NavigatorScreenParams<PrivateTabParamList>;
};
