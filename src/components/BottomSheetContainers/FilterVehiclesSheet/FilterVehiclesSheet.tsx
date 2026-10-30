import { useState } from "react";
import { Button, ScrollView, View } from "react-native";
import { AppText } from "../../AppText";
import { styles } from "./styles";
import { PlainText } from "../../PlainText";
import CustomField from "../../CustomField";
import { vehicleStore } from "../../../stores";
import { Vehicle } from "../../../types";
import { FormButton } from "../../FormButton";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { showMessage } from "react-native-flash-message";
import { useTranslation } from "react-i18next";

type Props = {
  onClose: ()=>void;
}

export const FilterVehiclesSheet =({onClose}: Props)=> {
  const [status, setStatus] = useState<Vehicle["status"]|"all">(vehicleStore.statusFilter);
  const {t} = useTranslation();

  const [error, setError] = useState<string>("");

  const onFitler = () => {
    vehicleStore.setStatusFilter(status);
    onClose();
  }


  return (
    <View style={styles.container}>
      <BottomSheetScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <AppText style={styles.title}>
        {t("vehicles.filter.title")}
      </AppText>

      <PlainText style={styles.description}>
        {t("vehicles.filter.description")}
      </PlainText>

      



        <CustomField
          type="segmented"
          label={t("vehicles.filter.status")}
          value={status}
          onChangeText={setStatus}
          options={[
            {
              option: "all",
              title: t("vehicles.filter.statuses.all"),
            },
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
              title: t("vehicles.filter.statuses.inactive"),
            },
          ]}
          containerStyle={styles.field}
        />


        <View style={styles.actions}>
          <FormButton
            onPress={onFitler}
          >
            <AppText style={{color: "#fff", fontSize: 22}}>{t("vehicles.filter.button")}</AppText>
          </FormButton>
        </View>
      </BottomSheetScrollView>
    </View>
  );
}