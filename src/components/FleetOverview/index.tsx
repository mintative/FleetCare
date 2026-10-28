import { Pressable, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { styles } from "./styles";
import { colors } from "../../theme/colors";
import { AppText } from "../AppText";
import { PrivateTabParamList } from "../../navigation/types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { vehicleStore } from "../../stores";
import { useTranslation } from "react-i18next";




type NavigationProp = BottomTabNavigationProp<
    PrivateTabParamList,
    "Home"
>;




export const FleetOverview = observer(() => {
    const navigation = useNavigation<NavigationProp>();
    const {t} = useTranslation();

    const TOTAL_FLEET = vehicleStore.totalVehicles;
    const ACTIVE_FLEET = vehicleStore.activeVehicles;
    const INACTIVE_FLEET = TOTAL_FLEET - ACTIVE_FLEET;
    const PERCENTAGE = Math.round((ACTIVE_FLEET / TOTAL_FLEET) * 100);
    return (
        <Pressable onPress={()=>{navigation.navigate("Vehicles")}}>
        <LinearGradient
            colors={[colors.primaryColor, colors.secondaryColor]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.info}>
                    <AppText style={styles.label}>{t("home.overview.title").toUpperCase()}</AppText>

                    <View style={styles.totalRow}>
                        <AppText style={styles.totalNumber}>
                            {TOTAL_FLEET}
                        </AppText>

                        <AppText style={styles.vehicleLabel}>
                            {t("home.overview.vehicles")}
                        </AppText>
                    </View>

                    <View style={styles.badge}>
                        <AppText style={styles.check}>✓</AppText>
                        <AppText style={styles.badgeText}>
                            {ACTIVE_FLEET} {t("home.overview.active")}
                        </AppText>
                    </View>
                </View>

                <View style={styles.availability}>
                    <View style={styles.circle}>
                        <AppText style={styles.percentage}>
                            {PERCENTAGE}%
                        </AppText>
                    </View>

                    <AppText style={styles.availabilityLabel}>
                        {t("home.overview.availability")}
                    </AppText>
                </View>
            </View>

            <View style={styles.progressTrack}>
                <View
                    style={[
                        styles.progress,
                        { width: `${PERCENTAGE}%` },
                    ]}
                />
            </View>

            <View style={styles.footer}>
                <View style={styles.stat}>
                    <View style={styles.activeDot} />
                    <AppText style={styles.statText}>
                        {t("home.overview.active")} {ACTIVE_FLEET}
                    </AppText>
                </View>

            </View>
            </View>
        </LinearGradient>
        </Pressable>
    );
});