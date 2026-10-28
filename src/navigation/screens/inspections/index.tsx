import { View, Text, Button } from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { InspectionsStackParamList } from '../../types';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Header } from '../../../components/Header';

type Props = NativeStackScreenProps<InspectionsStackParamList, 'InspectionsMain'>;

export default function InspectionsScreen({ navigation }: Props) {
  return (
    <ScreenContainer>
        <Header 
            title="Inspections"
            par="Stay compliant and road-ready"
        />
    </ScreenContainer>
  );
}