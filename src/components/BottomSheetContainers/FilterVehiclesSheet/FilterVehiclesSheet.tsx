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

type Props = {
  onClose: ()=>void;
}

export const FilterVehiclesSheet =({onClose}: Props)=> {
  const [status, setStatus] = useState<Vehicle["status"]|"all">(vehicleStore.statusFilter);
    

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
        Filter vehicles
      </AppText>

      <PlainText style={styles.description}>
        Narrow down the vehicle list.
      </PlainText>

      



        <CustomField
          type="segmented"
          label="Status"
          value={status}
          onChangeText={setStatus}
          options={[
            {
              option: "all",
              title: "All",
            },
            {
              option: "active",
              title: "Active",
            },
            {
              option: "maintenance",
              title: "Maintenance",
            },
            {
              option: "inactive",
              title: "Inactive",
            },
          ]}
          containerStyle={styles.field}
        />


        <View style={styles.actions}>
          <FormButton
            onPress={onFitler}
          >
            <AppText style={{color: "#fff", fontSize: 22}}>Filter</AppText>
          </FormButton>
        </View>
      </BottomSheetScrollView>
    </View>
  );
}