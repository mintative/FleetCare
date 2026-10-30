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

import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { useLanguage } from "../../localization/LangContext";

type Props = {
  item: Repair;
  onPress: ()=>void;

};




export const RepairItem = observer(({ item, onPress }: Props) => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const {currentLanguage} = useLanguage();

  const filterTabs = useMemo(() => [
    { title: t('maintenance.filters.all'), tab: 'all' as const },
    { title: t('maintenance.filters.planned'), tab: 'planned' as const },
    { title: t('maintenance.filters.in_progress'), tab: 'in_progress' as const },
    { title: t('maintenance.filters.completed'), tab: 'completed' as const },
  ], [t]);

  const priorities = useMemo(()=>[
    {title: t('maintenance.priorities.low'), option: "low"},
    {title: t('maintenance.priorities.medium'), option: "medium"},
    {title: t('maintenance.priorities.high'), option: "high"},
    {title: t('maintenance.priorities.critical'), option: "critical"},
  ],[t])


  const vehicle = vehicleStore.getVehicleById(item.vehicleId);
  const date = item.date ? new Date(item.date).toLocaleDateString(currentLanguage, {
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


        <Badge style={{marginTop:10}} title={filterTabs.find((t) => t.tab === item.status)?.title || item.status} type={item.status ==="completed" ? "success" : item.status==="in_progress" ? "warning" : "plain"} />

      </View>

      <View style={styles.info}>
        <AppText style={styles.repairTitle}>{item.title}</AppText>
        <PlainText style={styles.repairDescription}>{item.description}</PlainText>
      </View>
      <View style={styles.bottom}>
        <AppText style={[styles.priority, {color:priorityColor}]}>{priorities.find(p=>p.option===item.priority)?.title}</AppText>
        <PlainText style={styles.date}>{date}</PlainText>
        <Pressable style={styles.editButton} onPress={()=>onPress()}>
          <EditIcon width={20} height={20} color={theme.text} />
          <AppText style={styles.editText}>{t("maintenance.editButton")}</AppText>
        </Pressable>
      </View>
      

    </View>
  );
});