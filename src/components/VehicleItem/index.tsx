import { Image, Pressable, View } from "react-native";

import { AppText } from "../AppText";
import { PlainText } from "../PlainText";
import { Vehicle } from "../../types";
import { styles } from "./styles";
import { Badge } from "../Badge";
import { vehicleStore } from "../../stores";
import { colors } from "../../theme/colors";
import { useTheme } from "../../theme/ThemeContext";


type Props = {
  item: Vehicle;
  onPress: ()=>void;
};

export const VehicleItem = ({ item, onPress }: Props) => {
  const {theme} = useTheme();

  const inspectionStatus = vehicleStore.getInspectionStatus(item.id);
  
  return (
    <Pressable style={[styles.container, {backgroundColor:theme.card}]} onPress={()=>onPress()}>
      <View style={styles.imageContainer}>
        <Image
          source={
            item.imageUri
              ? typeof item.imageUri === "string"
                ? { uri: item.imageUri }
                : item.imageUri
              : require("../../assets/images/empty.png")
          }
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <AppText style={styles.title}>
            {item.brand} {item.model}
          </AppText>

          <View style={styles.indicator} />
        </View>

        <View style={styles.row}>
          <AppText style={[styles.plateNumber, {backgroundColor: theme.card}]}>
            {item.plateNumber}
          </AppText>

          <PlainText style={styles.year}>{item.year}</PlainText>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.detail}>

            <PlainText style={styles.mileage}>
              {Number(item.mileage ?? 0).toLocaleString("en-US")} km
            </PlainText>
          </View>

          <View style={styles.detail}>

            <PlainText style={{color: inspectionStatus==="overdue"?colors.redDark:inspectionStatus==="soon"?colors.orangeDark:"#666666"}}>
            {item.inspectionDate?.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
            }) ?? "—"}
            </PlainText>
          </View>
        </View>
        <Badge style={{marginTop:10}} title={item.status.charAt(0).toUpperCase() + item.status.slice(1)} type={item.status ==="active" ? "success" : item.status==="maintenance" ? "warning" : "plain"} />
      </View>
    </Pressable>
  );
};