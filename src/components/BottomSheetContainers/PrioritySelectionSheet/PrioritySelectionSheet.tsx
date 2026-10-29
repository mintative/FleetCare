
import { Pressable, View } from "react-native";
import { AppText } from "../../AppText";
import { styles } from "./styles";
import { PlainText } from "../../PlainText";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useTheme } from "../../../theme/ThemeContext";
import CheckIcon from "../../../assets/icons/check.svg";
import { priorities, Priority } from "../../../navigation/screens/addRepair";



type Props = {
  onClose: () => void;
  priority: Priority;
  setPriority: (priority:Priority)=>void;
};



export const PrioritySelectionSheet = ({ onClose, priority, setPriority}: Props) => {
  
  const { theme } = useTheme();

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
          <AppText style={styles.title}>Maintenance priority</AppText>
          <PlainText style={styles.description}>How urgently does this need attention?</PlainText>
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