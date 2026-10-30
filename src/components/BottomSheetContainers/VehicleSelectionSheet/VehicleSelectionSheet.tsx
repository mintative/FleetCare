import { useState } from "react";
import { Pressable, View } from "react-native";
import { AppText } from "../../AppText";
import { styles } from "./styles";
import { PlainText } from "../../PlainText";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useTheme } from "../../../theme/ThemeContext";
import CheckIcon from "../../../assets/icons/check.svg";

import { vehicleStore } from "../../../stores";
import { Vehicle } from "../../../types";
import { useTranslation } from "react-i18next";

type Props = {
  onClose: () => void;
  selectedVehicle: Vehicle["id"] | null;
  setSelectedVehicle: (id:Vehicle["id"])=>void;
};

export const VehicleSelectionSheet = ({ onClose, selectedVehicle, setSelectedVehicle}: Props) => {
  
  const { theme } = useTheme();
  const {t} = useTranslation();

  const onChoose = (id: string) => {
    setSelectedVehicle(id);
    onClose();
  };

  return (
    <View style={styles.container}>
      <BottomSheetFlatList
        data={vehicleStore.vehicles}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ItemSeparatorComponent={<View style={{height:10}}></View>}
        ListHeaderComponent={
          <AppText style={styles.title}>{t("maintenance.selectVehicle")}</AppText>
        }
        renderItem={({ item }) => {
          const isSelected = selectedVehicle === String(item.id);

          return (
            <Pressable
              onPress={() => onChoose(String(item.id))}
              style={[
                styles.buttonContainer,
                { backgroundColor: theme.card },
              ]}
            >
              <View style={styles.leftPart}>
                <View
                  style={[
                    styles.icon,
                    { backgroundColor: theme.background },
                  ]}
                >
                  <AppText style={styles.firstLetters}>
                    {item.brand?.slice(0, 1).toUpperCase()}
                    {item.brand?.slice(0, 1).toUpperCase()}
                  </AppText>
                </View>

                <View style={styles.langInfo}>
                  <AppText style={styles.lang}>
                    {item.brand} {item.model}
                  </AppText>

                  <PlainText style={styles.langPar}>
                    {item.plateNumber ?? ""}
                  </PlainText>
                </View>
              </View>

              <View style={styles.rightPart}>
                {isSelected && (
                  <View style={styles.checkIcon}>
                    <CheckIcon
                      width={20}
                      height={20}
                      color={theme.primary}
                    />
                  </View>
                )}
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};