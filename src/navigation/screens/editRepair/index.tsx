import { useState, useRef } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { showMessage } from "react-native-flash-message";

import { MaintenanceStackParamList } from "../../types";
import { ScreenContainer } from "../../../components/ScreenContainer";
import { styles } from "./styles";
import { colors } from "../../../theme/colors";
import BottomSheet, { BottomSheetRef } from "../../../components/BottomSheet";
import { useTheme } from "../../../theme/ThemeContext";
import { RepairsHeader } from "../../../components/RepairsHeader";
import CustomField from "../../../components/CustomField";
import BottomArrowIcon from "../../../assets/icons/bottom-arrow.svg";
import { AppText } from "../../../components/AppText";
import { VehicleSelectionSheet } from "../../../components/BottomSheetContainers/VehicleSelectionSheet/VehicleSelectionSheet";
import { maintenanceStore, vehicleStore } from "../../../stores";
import { PrioritySelectionSheet } from "../../../components/BottomSheetContainers/PrioritySelectionSheet/PrioritySelectionSheet";
import { DatePickerField } from "../../../components/DatePickerField";
import { FormButton } from "../../../components/FormButton";
import { Repair } from "../../../types";
import { DeleteSheet } from "../../../components/BottomSheetContainers/DeleteSheet/DeleteSheet";

type Props = NativeStackScreenProps<MaintenanceStackParamList, "EditRepair">;
export type Priority = "low" | "high" | "medium" | "critical";

export const priorities: {
  priority: Priority;
  title: string;
  description: string;
  textColor: string;
}[] = [
  {
    priority: "low",
    title: "Low",
    description: "Routine - schedule at next service",
    textColor: colors.greenDark,
  },
  {
    priority: "medium",
    title: "Medium",
    description: "Fix within two weeks",
    textColor: colors.blueDark,
  },
  {
    priority: "high",
    title: "High",
    description: "Fix this week, vehicle usable",
    textColor: colors.orangeDark,
  },
  {
    priority: "critical",
    title: "Critical",
    description: "Unsafe - take vehicle off the road",
    textColor: colors.redDark,
  },
];

const toDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const EditRepairScreen = observer(({ navigation, route }: Props) => {
  const { repairId } = route.params;
  const repair = maintenanceStore.getRepairById(repairId);

  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(
    repair?.vehicleId ?? null
  );
  const [repairTitle, setRepairTitle] = useState(repair?.title ?? "");
  const [repairDescription, setRepairDescription] = useState(
    repair?.description ?? ""
  );
  const [priority, setPriority] = useState<Priority>(repair?.priority ?? "low");
  const [estimatedCost, setEstimatedCost] = useState(
    repair?.cost !== undefined ? String(repair.cost) : ""
  );
  const [date, setDate] = useState<string | null>(
    repair?.date ?? toDateString(new Date())
  );
  const [status, setStatus] = useState<Repair["status"]>(
    repair?.status ?? "planned"
  );

  const [error, setError] = useState<string>("");

  const vehicleSelectionSheetRef = useRef<BottomSheetRef>(null);
  const prioritySelectionSheetRef = useRef<BottomSheetRef>(null);
  const deleteSheetRef = useRef<BottomSheetRef>(null);
  const { theme } = useTheme();


  if (!repair) {
    return (
      <ScreenContainer>
        <RepairsHeader
          title="Maintenance editing"
          onBackPress={() => navigation.goBack()}
        />
        <View style={{ padding: 20 }}>
          <AppText style={{ color: theme.text }}>Repair not found</AppText>
        </View>
      </ScreenContainer>
    );
  }

  const validateForm = (): boolean => {
    if (!selectedVehicle) {
      setError("Select a vehicle");
      showMessage({
        type: "danger",
        message: "Vehicle is required",
        description: "Please select a vehicle for this repair.",
      });
      return false;
    }

    if (!repairTitle.trim()) {
      setError("Enter repair title");
      showMessage({
        type: "danger",
        message: "Title is required",
        description: "Please enter a repair title.",
      });
      return false;
    }

    if (
      estimatedCost !== "" &&
      (!Number.isFinite(Number(estimatedCost)) || Number(estimatedCost) < 0)
    ) {
      setError("Enter a valid cost");
      showMessage({
        type: "danger",
        message: "Invalid cost",
        description: "Estimated cost must be a non-negative number.",
      });
      return false;
    }

    setError("");
    return true;
  };

  const onEdit = () => {
    if (!validateForm() || !selectedVehicle) {
      return;
    }

    try {
      maintenanceStore.updateRepair(repair.id, {
        vehicleId: selectedVehicle,
        title: repairTitle,
        description: repairDescription,
        priority,
        cost: estimatedCost ? Number(estimatedCost) : 0,
        date: date ?? toDateString(new Date()),
        status,
      });

      showMessage({
        type: "success",
        message: "Repair task updated successfully",
      });

      navigation.goBack();
    } catch (err: any) {
      showMessage({
        type: "danger",
        message: "Error updating repair",
        description: err.message,
      });
    }
  };
  
  const onDeleteRepair = () => {
        if (repair) {
            navigation.navigate("MaintenanceMain");
            maintenanceStore.removeRepair(repair.id);
            showMessage({
                message: `Repair was removed`
            })
            
        }
        return;
    }


  const vehicle = selectedVehicle ?vehicleStore.getVehicleById(selectedVehicle) :null;

  return (
    <ScreenContainer>
      <RepairsHeader
        title="Maintenance editing"
        description={repair.title}
        onBackPress={() => {
          navigation.goBack();
        }}
        onDeleteButtonPress={()=>{deleteSheetRef.current?.open()}}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 50,
          flexDirection: "column",
          gap: 20,
        }}
        style={{ padding: 20 }}
      >
        <Pressable
          onPress={() => {
            vehicleSelectionSheetRef.current?.open();
          }}
        >
          <AppText style={styles.label}>Vehicle</AppText>
          <View style={styles.selectionButton}>
            <Text
              style={[
                styles.selectionText,
                selectedVehicle && { color: theme.text },
              ]}
            >
              {selectedVehicle
                ? `${vehicle?.brand} ${
                    vehicle?.model
                  } ∙ ${
                    vehicle?.plateNumber
                  }`
                : "Select vehicle"}
            </Text>
            <BottomArrowIcon width={20} height={20} />
          </View>
        </Pressable>

        <CustomField
          type="text"
          label="Repair Title"
          value={repairTitle}
          onChangeText={setRepairTitle}
          placeholder="Brake noise on front axle"
        />

        <CustomField
          type="text"
          label="Repair Description"
          value={repairDescription}
          onChangeText={setRepairDescription}
          placeholder="What happened, when it started, any warning lights..."
          isTextArea={true}
          maxLength={500}
          optional
        />

        <Pressable
          onPress={() => {
            prioritySelectionSheetRef.current?.open();
          }}
        >
          <AppText style={styles.label}>Priority</AppText>
          <View style={styles.selectionButton}>
            <Text
              style={[
                styles.selectionText,
                priority && {
                  color: priorities.find((p) => p.priority === priority)
                    ?.textColor,
                },
              ]}
            >
              {priority
                ? priorities.find((p) => p.priority === priority)?.title
                : "Select priority"}
            </Text>
            <BottomArrowIcon width={20} height={20} />
          </View>
        </Pressable>

        <CustomField
          type="text"
          label="Estimated cost"
          value={estimatedCost}
          onChangeText={setEstimatedCost}
          placeholder="0"
          suffix="€"
          keyboardType="numeric"
          optional
        />

        <DatePickerField
          label="Maintenance date"
          value={date}
          onChange={setDate}
          placeholder="Select repair date"
          optional
        />

        <CustomField
          type="segmented"
          label="Status"
          value={status}
          onChangeText={(val) => setStatus(val as Repair["status"])}
          options={[
            {
              option: "planned",
              title: "Planned",
            },
            {
              option: "in_progress",
              title: "In progress",
            },
            {
              option: "completed",
              title: "Completed",
            },
          ]}
          containerStyle={styles.field}
        />

        <FormButton onPress={onEdit}>
          <AppText style={{ color: "#fff", fontSize: 22 }}>Update repair</AppText>
        </FormButton>
      </ScrollView>

      <BottomSheet
                ref={deleteSheetRef}
                snapPoints={['35%']}
            >
                <DeleteSheet onClose={() => deleteSheetRef.current?.close()} onConfirm={()=>{onDeleteRepair()}} title={`Remove this repair?`} />
            </BottomSheet>

      <BottomSheet ref={vehicleSelectionSheetRef} snapPoints={["90%"]}>
        <VehicleSelectionSheet
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          onClose={() => vehicleSelectionSheetRef.current?.close()}
        />
      </BottomSheet>

      <BottomSheet ref={prioritySelectionSheetRef} snapPoints={["60%"]}>
        <PrioritySelectionSheet
          priority={priority}
          setPriority={setPriority}
          onClose={() => prioritySelectionSheetRef.current?.close()}
        />
      </BottomSheet>
    </ScreenContainer>
  );
});