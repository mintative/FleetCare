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
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

export const HomeScreen = observer(({ navigation }: Props) => {
    const {t} = useTranslation();

    const getWelcomeText = (): string => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return t("home.welcomeMorning");
    }

    if (hour >= 12 && hour < 18) {
        return t("home.welcomeAfterNoon");
    }

    if (hour >= 18 && hour < 22) {
        return t("home.welcomeEvening");
    }

    return t("home.welcomeNight");
    };
  return (
    <ScreenContainer style={{padding:20}}>
        <Header
            title={getWelcomeText()}
            par={t("home.par")}
        />
        <FleetOverview />
        <View style={styles.cardsContainer}>
            <StatsCard
                Icon={VehicleIcon}
                number={vehicleStore.activeVehicles}
                par={t("home.cards.active_vehicles")}
                darkColor={colors.greenDark}
                lightColor={colors.greenLight}
            />
            <StatsCard
                Icon={MaintenanceIcon}
                number={vehicleStore.maintenanceVehicles}
                par={t("home.cards.in_maintenance")}
                darkColor={colors.blueDark}
                lightColor={colors.blueLight}
            />
            <StatsCard
                Icon={OverdueIcon}
                number={vehicleStore.inspectionWarningVehicles}
                par={t("home.cards.inspections_due")}
                darkColor={colors.orangeDark}
                lightColor={colors.orangeLight}
            />
            <StatsCard
                Icon={WarningIcon}
                number={vehicleStore.overDueVehicles}
                par={t("home.cards.overdue")}
                darkColor={colors.redDark}
                lightColor={colors.redLight}
            />
        </View>
    </ScreenContainer>
  );
})