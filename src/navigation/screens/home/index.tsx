import { View, Text, Button } from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../types';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { Header } from '../../../components/Header';
import { FleetOverview } from '../../../components/FleetOverview';
import { StatsCard } from '../../../components/StatsCard';
import VehicleIcon from '../../../assets/icons/vehicles.svg';
import WarningIcon from '../../../assets/icons/warning.svg';
import OverdueIcon from '../../../assets/icons/overdue.svg';
import MaintenanceIcon from '../../../assets/icons/maintenance.svg';
import { styles } from './styles';
import { colors } from '../../../theme/colors';
import { observer } from 'mobx-react-lite';
import { vehicleStore } from '../../../stores';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

export const HomeScreen = observer(({ navigation }: Props) => {
    const getWelcomeText = (): string => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return 'Good morning';
    }

    if (hour >= 12 && hour < 18) {
        return 'Good afternoon';
    }

    if (hour >= 18 && hour < 22) {
        return 'Good evening';
    }

    return 'Good night';
    };
  return (
    <ScreenContainer style={{padding:20}}>
        <Header
            title={getWelcomeText()}
            par="Here's your fleet overview"
        />
        <FleetOverview />
        <View style={styles.cardsContainer}>
            <StatsCard
                Icon={VehicleIcon}
                number={vehicleStore.activeVehicles}
                par="Active Vehicles"
                darkColor={colors.greenDark}
                lightColor={colors.greenLight}
            />
            <StatsCard
                Icon={MaintenanceIcon}
                number={vehicleStore.maintenanceVehicles}
                par="In Maintenance"
                darkColor={colors.blueDark}
                lightColor={colors.blueLight}
            />
            <StatsCard
                Icon={OverdueIcon}
                number={vehicleStore.inspectionWarningVehicles}
                par="Inspections Due"
                darkColor={colors.orangeDark}
                lightColor={colors.orangeLight}
            />
            <StatsCard
                Icon={WarningIcon}
                number={vehicleStore.overDueVehicles}
                par="Overdue"
                darkColor={colors.redDark}
                lightColor={colors.redLight}
            />
        </View>
    </ScreenContainer>
  );
})