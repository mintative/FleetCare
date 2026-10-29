import { Image, Pressable, View } from "react-native";

import { AppText } from "../AppText";
import { PlainText } from "../PlainText";
import { Repair, Vehicle } from "../../types";
import { styles } from "./styles";
import { Badge } from "../Badge";
import { vehicleStore } from "../../stores";
import { colors } from "../../theme/colors";
import { useTheme } from "../../theme/ThemeContext";
import EditIcon from "../../assets/icons/edit.svg";
import { observer } from "mobx-react-lite";
import { FILTER_TABS } from "../../navigation/screens/maintenance";

type Props = {
  item: Repair;
  onPress: ()=>void;

};

export const RepairItem = observer(({ item, onPress }: Props) => {
  const {theme} = useTheme();


  const vehicle = vehicleStore.getVehicleById(item.vehicleId);
  const date = item.date ? new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      }) : "";
  const priorityColor = item.priority === "critical" ? colors.redDark : item.priority === "high" ? colors.orangeDark : item.priority === "medium" ? colors.blueDark : colors.greenDark

  return (
    <View style={[styles.container, {backgroundColor:theme.card}]}>
      
      <View style={styles.top}>
        <View style={styles.content}>
        <View style={styles.header}>
          <AppText style={styles.title}>
            {vehicle && vehicle.brand} {vehicle && vehicle.model}
          </AppText>


        </View>

        <View style={styles.row}>
          <PlainText style={[styles.plateNumber, {backgroundColor: theme.card}]}>
            {vehicle && vehicle.plateNumber}
          </PlainText>
        </View>
        
        
        </View>


        <Badge style={{marginTop:10}} title={FILTER_TABS.find((t) => t.tab === item.status)?.title || item.status} type={item.status ==="completed" ? "success" : item.status==="in_progress" ? "warning" : "plain"} />

      </View>

      <View style={styles.info}>
        <AppText style={styles.repairTitle}>{item.title}</AppText>
        <PlainText style={styles.repairDescription}>{item.description}</PlainText>
      </View>
      <View style={styles.bottom}>
        <AppText style={[styles.priority, {color:priorityColor}]}>{item.priority.charAt(0).toUpperCase()+ item.priority.slice(1)}</AppText>
        <PlainText style={styles.date}>{date}</PlainText>
        <Pressable style={styles.editButton} onPress={()=>onPress()}>
          <EditIcon width={20} height={20} color={theme.text} />
          <AppText style={styles.editText}>Edit</AppText>
        </Pressable>
      </View>
      
        

    </View>
  );
});