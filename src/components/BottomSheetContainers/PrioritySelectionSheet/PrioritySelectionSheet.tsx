
import { Pressable, View } from "react-native";
import { AppText } from "../../AppText";
import { styles } from "./styles";
import { PlainText } from "../../PlainText";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useTheme } from "../../../theme/ThemeContext";
import CheckIcon from "../../../assets/icons/check.svg";
import {  Priority } from "../../../navigation/screens/addRepair";
import { useTranslation } from "react-i18next";
import { colors } from "../../../theme/colors";
import { useMemo } from "react";



type Props = {
  onClose: () => void;
  priority: Priority;
  setPriority: (priority:Priority)=>void;
};



export const PrioritySelectionSheet = ({ onClose, priority, setPriority}: Props) => {
  
  const { theme } = useTheme();
  const {t} = useTranslation();
  const priorities = useMemo(()=>[
    {
      priority: "low",
      title: t("maintenance.priorities.low"),
      description: t("maintenance.priorities.lowDescription"),
      textColor: colors.greenDark,
    },
    {
      priority: "medium",
      title: t("maintenance.priorities.medium"),
      description: t("maintenance.priorities.mediumDescription"),
      textColor: colors.blueDark,
    },
    {
      priority: "high",
      title: t("maintenance.priorities.high"),
      description: t("maintenance.priorities.highDescription"),
      textColor: colors.orangeDark,
    },
    {
      priority: "critical",
      title: t("maintenance.priorities.critical"),
      description: t("maintenance.priorities.criticalDescription"),
      textColor: colors.redDark,
    },
  ], [t])

  const onChoose = (priority: Priority) => {
    setPriority(priority);
    onClose();
  };

  return (
    <View style={styles.container}>
      <BottomSheetFlatList
        data={priorities}
        keyExtractor={(item) => String(item.priority)}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ItemSeparatorComponent={<View style={{height:10}}></View>}
        ListHeaderComponent={
          <View>
          <AppText style={styles.title}>{t("maintenance.selectPriority")}</AppText>
          <PlainText style={styles.description}>{t("maintenance.selectPriorityDescription")}</PlainText>
          </View>
        }
        renderItem={({ item }) => {
          const isSelected = priority === String(item.priority);

          return (
            <Pressable
              onPress={() => onChoose(item.priority)}
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
                    {item.title?.slice(0, 1).toUpperCase()}
                  </AppText>
                </View>

                <View style={styles.langInfo}>
                  <AppText style={[styles.lang, {color: item.textColor}]}>
                    {item.title}
                  </AppText>

                  <PlainText style={styles.langPar}>
                    {item.description ?? ""}
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