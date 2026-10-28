import { View, Text, Button } from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MaintenanceStackParamList } from '../../types';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Header } from '../../../components/Header';

type Props = NativeStackScreenProps<MaintenanceStackParamList, 'MaintenanceMain'>;

export default function MaintenanceScreen({ navigation }: Props) {
  return (
    <ScreenContainer>
        <Header
            title="Maintenance"
            par="Track repairs and service history"
        />
    </ScreenContainer>
  );
}