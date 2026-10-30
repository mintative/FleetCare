import { Image, Pressable, ScrollView, View } from "react-native"
import { VehiclesStackParamList } from "../../types"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppText } from "../../../components/AppText"
import { VehicleDetailsHeader } from "../../../components/VehiclesDetailsHeader"
import { observer } from "mobx-react-lite"
import { vehicleStore } from "../../../stores"
import { ScreenContainer } from "../../../components/ScreenContainer"
import { styles } from "./styles"
import LinearGradient from "react-native-linear-gradient"
import { colors } from "../../../theme/colors"
import { PlainText } from "../../../components/PlainText"
import { Badge } from "../../../components/Badge"
import BottomSheet, { BottomSheetRef } from "../../../components/BottomSheet"
import { useRef } from "react"

import { Vehicle } from "../../../types"
import { useTheme } from "../../../theme/ThemeContext"
import { LOCAL_IMAGES } from "../../../services/localImages"
import { DeleteButton } from "../../../components/DeleteButton"
import { DeleteSheet } from "../../../components/BottomSheetContainers/DeleteSheet/DeleteSheet"
import { showMessage } from "react-native-flash-message"
import Share from "react-native-share"
import { useTranslation } from "react-i18next"
import { useLanguage } from "../../../localization/LangContext"
import { EditVehicleSheet } from "../../../components/BottomSheetContainers/EditVehicleSheet/EditVehicleSheet"


type Props = NativeStackScreenProps<VehiclesStackParamList, "VehicleDetails">


const getDaysUntil = (date: Date) => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const diff = targetDate.getTime() - today.getTime();
    const days = Math.round(diff / (1000 * 60 * 60 * 24));

    if (days < 0) return `${Math.abs(days)} days ago`;
    if (days === 0) return "Today";
    if (days === 1) return "Tomorrow";

    return `In ${days} days`;
};

const getInspectionColor = (date?: Date) => {
    if (!date) return "#666666";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const inspectionDate = new Date(date);
    inspectionDate.setHours(0, 0, 0, 0);

    const diff = inspectionDate.getTime() - today.getTime();
    const days = Math.round(diff / (1000 * 60 * 60 * 24));

    if (days <= 0) return colors.redDark;
    if (days <= 30) return colors.orangeDark;

    return colors.greenDark;
};

const getStatus = (status: Vehicle["status"]) => {
    return status === "active" ? "success" : status === "maintenance" ? "warning" : "plain";
}

export const VehicleDetails = observer(({navigation, route}: Props) => {
    const sheetRef = useRef<BottomSheetRef>(null);
    const deleteSheetRef = useRef<BottomSheetRef>(null);
    const {theme} = useTheme();
    const {t} = useTranslation();
    const {currentLanguage} = useLanguage();
    const { vehicleId } = route.params;
    const vehicle = vehicleStore.getVehicleById(vehicleId);


    const statuses = [
    {
        option: "active",
        title: t("vehicles.filter.statuses.active"),
    },
    {
        option: "maintenance",
        title: t("vehicles.filter.statuses.in_maintenance"),
    },
    {
        option: "inactive",
        title: t("vehicles.filter.statuses.inactive")
    }
    ]

    const getImageSource = () => {
        if(vehicle) {
            if (!vehicle.imageUri) {
                return require("../../../assets/images/empty.png");
                }
                
            
                if (LOCAL_IMAGES[vehicle.imageUri]) {
                return LOCAL_IMAGES[vehicle.imageUri];
                }
                
            
                if (typeof vehicle.imageUri === "string" && (vehicle.imageUri.startsWith("http") || vehicle.imageUri.startsWith("file"))) {
                return { uri: vehicle.imageUri };
                }
            
                return require("../../../assets/images/empty.png");
        }
        else {
            return;
        }
        
      };


    const onDeleteVehicle = () => {
        if (vehicle) {
            navigation.navigate("VehiclesMain");
            vehicleStore.removeVehicle(vehicle.id);
            showMessage({
                message: `${vehicle.brand} ${vehicle.model} ${t("vehicles.form.removeMessage")}`
            })
            
        }
        return;
    }

    const handleShareVehicle = async () => {
        if (!vehicle) return;

        const inspectionFormatted = vehicle.inspectionDate
            ? vehicle.inspectionDate.toLocaleDateString(currentLanguage, {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
              })
            : "Not scheduled";

        const inspectionDays = vehicle.inspectionDate 
            ? getDaysUntil(vehicle.inspectionDate) 
            : "";

        const shareMessage = 
        `*Vehicle Info: ${vehicle.brand} ${vehicle.model}*
        Plate Number: ${vehicle.plateNumber || "-"}
        VIN: ${vehicle.VIN || "-"}
        Fuel Type: ${vehicle.fuel || "-"}
        Mileage: ${vehicle.mileage ? `${vehicle.mileage} km` : "-"}

        *Upcoming Inspection:*
        ${inspectionFormatted} (${inspectionDays})`;

        try {
            await Share.open({
                title: `Share ${vehicle.brand} ${vehicle.model} Info`,
                message: shareMessage,
            });
        } catch (error: any) {
            if (error?.message && error.message !== 'User did not share') {
                console.log("Error sharing vehicle details:", error);
            }
        }
    };

    if (!vehicle) {
        return (
        <ScreenContainer>
            <AppText>{t("vehicles.noOneFound")}</AppText>
        </ScreenContainer>
        );
    }

    return (
        <ScreenContainer>
            <VehicleDetailsHeader vehicle={vehicle} onBackPress={()=>{navigation.goBack()}} onEditPress={() => sheetRef.current?.open()} onSharePress={()=>{handleShareVehicle()}} />
            <ScrollView
                contentContainerStyle={{flexGrow: 1,paddingBottom:50}}
                style={{padding:20}}
            >
                <LinearGradient
                            colors={[theme.gradient, theme.background]}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.mainContainer}
                        >
                    <Image
                        source={getImageSource()}
                        resizeMode="cover"
                        style={styles.image}
                    />
                    <View style={{padding:20}}>
                        <PlainText>{vehicle.brand.toUpperCase()}</PlainText>
                        <AppText style={{fontSize:32, fontWeight:"bold", marginTop: 5}}>{vehicle.model}</AppText>
                        <View style={styles.row}>
                            <AppText style={[styles.plateNumber, {backgroundColor:theme.card}]}>{vehicle.plateNumber}</AppText>
                            <Badge 
                                title={statuses.find(s=>s.option===vehicle.status)?.title??""}
                                type={getStatus(vehicle.status)}
                            />
                        </View>
                    </View>
                </LinearGradient>

                <View style={[styles.information, {backgroundColor: theme.card}]}>
                    <PlainText style={{fontWeight:"bold"}}>{t("vehicles.details.vehicleInformation").toUpperCase()}</PlainText>
                    <View style={styles.infoList}>
                        <View style={styles.infoRow}>
                            <PlainText>VIN</PlainText>
                            <AppText style={{fontWeight:"bold"}}>{vehicle.VIN? vehicle.VIN : "-"}</AppText>
                        </View>
                        <View style={styles.infoRow}>
                            <PlainText>Registration</PlainText>
                            <AppText style={{fontWeight:"bold"}}>{vehicle.plateNumber? vehicle.plateNumber : "-"}</AppText>
                        </View>
                        <View style={styles.infoRow}>
                            <PlainText>First registration</PlainText>
                            <AppText style={{fontWeight:"bold"}}>{vehicle.firstRegistration?vehicle.firstRegistration?.toLocaleDateString("en-UK",{day:"2-digit",month:"short", year:"numeric"}): "-"}</AppText>
                        </View>
                        <View style={styles.infoRow}>
                            <PlainText>Fuel type</PlainText>
                            <AppText style={{fontWeight:"bold"}}>{vehicle.fuel?vehicle.fuel:"-"}</AppText>
                        </View>
                        <View style={styles.infoRow}>
                            <PlainText>Mileage</PlainText>
                            <AppText style={{fontWeight:"bold"}}>{vehicle.mileage?vehicle.mileage:"-"} km</AppText>
                        </View>
                    </View>
                </View>


                <View style={[styles.information, {backgroundColor: theme.card}]}>
                    <PlainText style={{fontWeight:"bold"}}>{t("vehicles.details.upcomingInspection").toUpperCase()}</PlainText>
                    <View style={{marginTop:10}}>
                        <AppText style={{fontSize:32, fontWeight:"bold"}}>{vehicle.inspectionDate?.toLocaleDateString("en-UK", {day:"2-digit", month:"short", year:"numeric"})}</AppText>
                        <AppText style={{fontSize:18, fontWeight:"bold", marginTop:5, color: getInspectionColor(vehicle.inspectionDate)}}>{vehicle.inspectionDate? getDaysUntil(vehicle.inspectionDate): "No date"}</AppText>
                    </View>
                </View>

                <View style={[styles.information, {backgroundColor: theme.card}]}>
                    <PlainText style={{fontWeight:"bold"}}>{t("vehicles.details.repairsReport").toUpperCase()}</PlainText>
                    <Pressable
                    onPress={()=>{navigation.navigate("RepairsReport", {vehicleId: vehicle.id})}}
                        style={[styles.button, {backgroundColor:theme.background}]}
                    >
                        <AppText style={[styles.buttonText, {color:theme.text}]}>{t("vehicles.details.repairsReportButton")}</AppText>
                    </Pressable>
                </View>
                <DeleteButton title={t("vehicles.details.removeButton")} onPress={()=>{deleteSheetRef.current?.open()}} />
            </ScrollView>
            <BottomSheet
                ref={sheetRef}
                snapPoints={['90%']}
            >
                <EditVehicleSheet onClose={() => sheetRef.current?.close()} vehicle={vehicle}/>
            </BottomSheet>
            <BottomSheet
                ref={deleteSheetRef}
                snapPoints={['35%']}
            >
                <DeleteSheet onClose={() => deleteSheetRef.current?.close()} onConfirm={()=>{onDeleteVehicle()}} title={`Remove ${vehicle.brand} ${vehicle.model}?`} />
            </BottomSheet>
            
        </ScreenContainer>
    )
});